import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User as UserIcon, LogOut, Bell, Calendar ,Check} from "lucide-react";
import { useAuth } from "../AuthContext";
import NotificationsDropdown from "./NotificationsDropDown";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationError, setNotificationError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [bookingsCount, setBookingsCount] = useState(0);
  const { isLoggedIn, username, logout, isCaretaker, token, userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle dropdown visibility
  const toggleDesktopDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle mobile dropdown visibility
  const toggleMobileDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle notifications dropdown
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Mark notifications as read when dropdown is opened
      markNotificationsAsRead();
    }
    
    // Close bookings dropdown if open
    if (showBookings) {
      setShowBookings(false);
    }
  };

  // Toggle bookings dropdown
  const toggleBookings = () => {
    setShowBookings(!showBookings);
    if (!showBookings) {
      fetchCaregiverBookings();
    }
    
    // Close notifications dropdown if open
    if (showNotifications) {
      setShowNotifications(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Determine dashboard path based on user role
  const getDashboardPath = () => {
    return isCaretaker ? "/caregiver-dashboard" : "/user-dashboard";
  };

  // Fetch caregiver bookings
  const fetchCaregiverBookings = async () => {
    if (!isLoggedIn || !token || !isCaretaker) return;

    setBookingsLoading(true);
    setBookingsError(null);

    try {
      // First get caregiver ID
      const caregiverResponse = await axios.get("http://localhost:8080/api/caregiver/application", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!caregiverResponse.data || !caregiverResponse.data.id) {
        throw new Error("Caregiver data not found");
      }
      
      // Then fetch bookings with that ID
      const bookingsResponse = await axios.get(`http://localhost:8080/api/bookings/caregiver/${caregiverResponse.data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBookings(bookingsResponse.data || []);
      setBookingsCount(bookingsResponse.data?.length || 0);
      setBookingsLoading(false);
    } catch (err) {
      console.error("Error fetching caregiver bookings:", err);
      setBookingsError("Failed to load bookings");
      setBookings([]);
      setBookingsLoading(false);
    }
  };

  // Handle booking actions (accept/reject)
  const handleBookingAction = async (bookingId, action) => {
    try {
      if (!token) {
        setBookingsError("Authentication token not found. Please log in again.");
        return;
      }
      
      if (action === "reject") {
        setSelectedBooking(bookingId);
        setShowRejectModal(true);
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/bookings/${bookingId}/${action}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Refresh bookings after action
      fetchCaregiverBookings();
    } catch (err) {
      console.error("Error updating booking:", err);
      if (err.response) {
        setBookingsError(err.response.data?.message || "Failed to update booking");
      } else {
        setBookingsError("Network error. Please check your connection.");
      }
    }
  };

  // Handle rejection submission
  const handleRejectSubmit = async () => {
    try {
      if (!token) {
        setBookingsError("Authentication token not found. Please log in again.");
        return;
      }

      await axios.put(`http://localhost:8080/api/bookings/${selectedBooking}/reject`, 
        { reason: rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Refresh bookings after rejection
      fetchCaregiverBookings();
      setShowRejectModal(false);
      setRejectionReason("");
      setSelectedBooking(null);
    } catch (err) {
      console.error("Error rejecting booking:", err);
      setBookingsError("Failed to reject booking: " + (err.response?.data?.message || err.message));
    }
  };

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!isLoggedIn || !token) return;

      try {
        const response = await axios.get("http://localhost:8080/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data) {
          setNotifications(response.data);
          // Count unread notifications
          const unread = response.data.filter(notification => !notification.read).length;
          setUnreadCount(unread);
        } else {
          setNotifications([]);
          setUnreadCount(0);
        }
        setNotificationError(null);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setNotificationError("Failed to load notifications");
        setNotifications([]);
        setUnreadCount(0);
      }
    };

    // Fetch notifications and bookings count when component mounts and user is logged in
    if (isLoggedIn) {
      fetchNotifications();
      
      // If user is a caregiver, get booking count but don't display the dropdown yet
      if (isCaretaker) {
        fetchCaregiverBookings();
      }
      
      // Set up interval to check for new notifications every minute
      const intervalId = setInterval(fetchNotifications, 60000);
      
      // Clean up interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn, token, isCaretaker]);

  // Mark notifications as read
  const markNotificationsAsRead = async () => {
    if (!isLoggedIn || !token || unreadCount === 0) return;

    try {
      await axios.put("http://localhost:8080/api/notifications/mark-read", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Update local state to show all notifications as read
      setNotifications(notifications.map(notification => ({
        ...notification,
        read: true
      })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };
  
  const refreshNotifications = async () => {
    if (!isLoggedIn || !token) return;
  
    try {
      const response = await axios.get("http://localhost:8080/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data) {
        setNotifications(response.data);
        // Count unread notifications
        const unread = response.data.filter(notification => !notification.read).length;
        setUnreadCount(unread);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
      setNotificationError(null);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setNotificationError("Failed to load notifications");
      setNotifications([]);
      setUnreadCount(0);
    }
  };
  
  // Bookings Dropdown Component
  const BookingsDropdown = ({ bookings, error, loading, onClose }) => {
    return (
      <div className="p-3">
        <div className="flex justify-between items-center mb-2 pb-2 border-b">
          <h3 className="font-semibold">Pending Bookings</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {loading ? (
          <div className="py-4 text-center text-gray-600">Loading bookings...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-600">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="py-4 text-center text-gray-600">No pending bookings</div>
        ) : (
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-gray-50 p-3 rounded">
                <div className="mb-2">
                  <p className="font-medium">Booking #{booking.id}</p>
                  <p className="text-sm text-gray-600">User ID: {booking.userId}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBookingAction(booking.id, "accept")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center text-xs"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleBookingAction(booking.id, "reject")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-3 pt-2 border-t">
          <Link 
            to="/caregiver-dashboard" 
            className="block w-full py-2 text-center text-sm text-blue-600 hover:text-blue-800"
            onClick={onClose}
          >
            View Full Dashboard
          </Link>
        </div>
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              CareFinder
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === "/" 
                    ? "text-gray-900 border-b-2 border-blue-500" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={toggleDesktopDropdown}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none"
                >
                  Services{" "}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    } transition-transform duration-200`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/child-care"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Child Care
                    </Link>
                    <Link
                      to="/senior-care"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Senior Care
                    </Link>
                    <Link
                      to="/pet-care"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Pet Care
                    </Link>
                    <Link
                      to="/house-keeping"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      House Keeping
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/how-it-works"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === "/how-it-works" 
                    ? "text-gray-900 border-b-2 border-blue-500" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                How it Works
              </Link>
              <Link
                to="/safety"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === "/safety" 
                    ? "text-gray-900 border-b-2 border-blue-500" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Safety
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* Bookings button (only for caregivers) */}
                {isCaretaker && (
                  <div className="relative">
                    <button
                      onClick={toggleBookings}
                      className="relative p-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                      aria-label="Bookings"
                    >
                      <Calendar className="h-5 w-5" />
                      {bookingsCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                          {bookingsCount > 9 ? '9+' : bookingsCount}
                        </span>
                      )}
                    </button>
                    
                    {/* Bookings dropdown */}
                    {showBookings && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
                        <BookingsDropdown 
                          bookings={bookings} 
                          error={bookingsError}
                          loading={bookingsLoading}
                          onClose={() => setShowBookings(false)}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Notifications button */}
                <div className="relative">
                  <button
                    onClick={toggleNotifications}
                    className="relative p-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Notifications dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
                      <NotificationsDropdown 
                        notifications={notifications} 
                        error={notificationError} 
                        onClose={() => setShowNotifications(false)}
                        refreshNotifications={refreshNotifications}
                      />
                    </div>
                  )}
                </div>
                
                <Link to={getDashboardPath()} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  <UserIcon className="h-4 w-4 mr-1" />
                  {username}
                  {isCaretaker && <span className="ml-1 text-xs text-blue-600">(Caregiver)</span>}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden">
            {isLoggedIn && (
              <>
                {/* Mobile Bookings button (only for caregivers) */}
                {isCaretaker && (
                  <div className="mr-2 relative">
                    <button
                      onClick={toggleBookings}
                      className="relative p-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                      aria-label="Bookings"
                    >
                      <Calendar className="h-5 w-5" />
                      {bookingsCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                          {bookingsCount > 9 ? '9+' : bookingsCount}
                        </span>
                      )}
                    </button>
                    
                    {/* Mobile bookings dropdown */}
                    {showBookings && (
                      <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-50">
                        <BookingsDropdown 
                          bookings={bookings} 
                          error={bookingsError}
                          loading={bookingsLoading}
                          onClose={() => setShowBookings(false)}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Mobile Notifications button */}
                <div className="mr-2 relative">
                  <button
                    onClick={toggleNotifications}
                    className="relative p-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Mobile notifications dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-50">
                      <NotificationsDropdown 
                        notifications={notifications} 
                        error={notificationError} 
                        onClose={() => setShowNotifications(false)}
                        refreshNotifications={refreshNotifications}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                location.pathname === "/" 
                  ? "text-blue-700 bg-blue-50" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={toggleMobileDropdown}
                className="w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 flex justify-between items-center"
              >
                Services{" "}
                <ChevronDown
                  className={`ml-2 h-4 w-4 transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  } transition-transform duration-200`}
                />
              </button>
              {isDropdownOpen && (
                <div className="pl-6 space-y-1 py-1">
                  <Link
                    to="/child-care"
                    className="block pl-3 pr-4 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Child Care
                  </Link>
                  <Link
                    to="/senior-care"
                    className="block pl-3 pr-4 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Senior Care
                  </Link>
                  <Link
                    to="/pet-care"
                    className="block pl-3 pr-4 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Pet Care
                  </Link>
                  <Link
                    to="/house-keeping"
                    className="block pl-3 pr-4 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    House Keeping
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/how-it-works"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            >
              How it Works
            </Link>
            <Link
              to="/safety"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            >
              Safety
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col items-center">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center mb-4">
                    <Link 
                      to={getDashboardPath()}
                      className="flex items-center"
                    >
                      <UserIcon className="h-5 w-5 mr-2 text-gray-700 cursor-pointer" />
                      <span className="text-base font-medium text-gray-700">
                        {username}
                        {isCaretaker && <span className="ml-1 text-xs text-blue-600">(Caregiver)</span>}
                      </span>
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 text-base font-medium text-red-600 hover:text-red-800"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-base font-medium text-blue-600 hover:text-blue-800"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="block mt-2 px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
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
                  setSelectedBooking(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;