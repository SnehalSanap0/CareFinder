import React, { useState } from "react";
import { CheckCircle, Trash2, Check, X } from "lucide-react";
import axios from "axios";
import { useAuth } from "../AuthContext";

const NotificationsDropdown = ({ notifications, error, onClose, refreshNotifications }) => {
  const { token, isCaretaker } = useAuth();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processingAction, setProcessingAction] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Format the timestamp to a more readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If it's today, just show the time
    if (date.toDateString() === now.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // If it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show the full date
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Call refreshNotifications to update the notifications list
      if (refreshNotifications) {
        refreshNotifications();
      } else {
        // If no refresh function provided, just close the dropdown
        onClose();
      }
    } catch (err) {
      console.error("Error deleting notification:", err);
      setActionError("Failed to delete notification. Please try again.");
    }
  };

  // Check if notification is a booking request
  const isBookingNotification = (notification) => {
    return notification.bookingId !== undefined && notification.bookingId !== null;
  };

  // Handle booking action (accept/reject)
  const handleBookingAction = async (bookingId, action) => {
    if (!token) {
      setActionError("Authentication token not found. Please log in again.");
      return;
    }

    if (action === "reject") {
      // Show rejection modal
      setSelectedBookingId(bookingId);
      setShowRejectModal(true);
      return;
    }

    try {
      setProcessingAction(bookingId);
      setActionError(null);
      
      const response = await axios.put(`http://localhost:8080/api/bookings/${bookingId}/${action}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log(`Successfully ${action}ed booking ${bookingId}`);
      
      // Call refreshNotifications to update the notifications list
      if (refreshNotifications) {
        refreshNotifications();
      } else {
        // If no refresh function provided, just close the dropdown
        onClose();
      }
    } catch (err) {
      console.error(`Error ${action}ing booking:`, err);
      setActionError(`Failed to ${action} booking. Please try again later.`);
    } finally {
      setProcessingAction(null);
    }
  };

  // Handle rejection submit
  const handleRejectSubmit = async () => {
    if (!token || !selectedBookingId) return;

    try {
      setProcessingAction(selectedBookingId);
      setActionError(null);
      
      await axios.put(`http://localhost:8080/api/bookings/${selectedBookingId}/reject`, 
        { reason: rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Clean up and refresh
      setRejectionReason("");
      setSelectedBookingId(null);
      setShowRejectModal(false);
      
      if (refreshNotifications) {
        refreshNotifications();
      } else {
        onClose();
      }
    } catch (err) {
      console.error("Error rejecting booking:", err);
      setActionError("Failed to reject booking. Please try again later.");
    } finally {
      setProcessingAction(null);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      setActionError(null);
      
      await axios.put("http://localhost:8080/api/notifications/mark-read", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Successfully marked all notifications as read");
      
      // Refresh notifications
      if (refreshNotifications) {
        refreshNotifications();
      } else {
        onClose();
      }
    } catch (err) {
      console.error("Error marking notifications as read:", err);
      setActionError("Failed to mark notifications as read. Please try again.");
    }
  };

  // Debug notification structure
  console.log("Notifications received:", notifications);
  console.log("Is caregiver:", isCaretaker);

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
        {notifications && notifications.length > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Mark all as read
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 text-center text-red-500 text-sm">
          {error}
        </div>
      )}

      {actionError && (
        <div className="p-2 text-center text-red-500 text-sm">
          {actionError}
        </div>
      )}

      {(!notifications || notifications.length === 0) && !error && (
        <div className="p-4 text-center text-gray-500 text-sm">
          No notifications
        </div>
      )}

      {/* Debug panel in development */}
      {/* {process.env.NODE_ENV !== 'production' && (
        <div className="p-2 text-xs bg-gray-100 border-b">
          <details>
            <summary>Debug Info</summary>
            <pre className="text-left overflow-auto max-h-32">
              {JSON.stringify(notifications?.slice(0, 2), null, 2)}
            </pre>
          </details>
        </div>
      )} */}

      {notifications && notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${notification.read ? '' : 'bg-blue-50'}`}
        >
          <div className="flex justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-800 whitespace-pre-line">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatTimestamp(notification.createdAt)}
              </p>
              
              {/* Booking action buttons for caregivers */}
              {isCaretaker && isBookingNotification(notification) && (
                <div className="mt-2 flex gap-2">
                  <button 
                    onClick={() => handleBookingAction(notification.bookingId, "accept")}
                    disabled={processingAction === notification.bookingId}
                    className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 flex items-center disabled:opacity-50"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Accept
                  </button>
                  <button 
                    onClick={() => handleBookingAction(notification.bookingId, "reject")}
                    disabled={processingAction === notification.bookingId}
                    className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 flex items-center disabled:opacity-50"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Reject
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={() => deleteNotification(notification.id)}
              className="ml-2 text-gray-400 hover:text-red-500"
              aria-label="Delete notification"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      {notifications && notifications.length > 0 && (
        <div className="p-2 bg-gray-50 text-center">
          <button 
            onClick={onClose}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Reason for Rejection</h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Please provide a reason for rejecting this booking"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                  setSelectedBookingId(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={processingAction === selectedBookingId}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;