import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, Calendar, User, Check, X, Bell } from "lucide-react";
import { useAuth } from "../AuthContext";

function CaregiverDashboard() {
  const { token, userId } = useAuth();
  console.log("CaregiverDashboard mounted with token:", token ? "available" : "not available");
  console.log("User ID:", userId);

  const [caregiver, setCaregiver] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    services: [],
    experience: "",
    hourlyRate: 0,
    status: ""
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [setNotifications] = useState([]);

  // Function to generate a random color based on name
  const getRandomColor = (name) => {
    if (!name) return 'bg-gray-400';
    
    const colors = [
      'bg-red-400', 'bg-blue-400', 'bg-green-400', 
      'bg-yellow-400', 'bg-purple-400', 'bg-pink-400',
      'bg-indigo-400',  'bg-orange-400'
    ];
    
    // Use the first character's char code to pick a consistent color
    const charCode = name.charCodeAt(0);
    const colorIndex = charCode % colors.length;
    return colors[colorIndex];
  };

  useEffect(() => {
    const fetchCaregiverData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }
        
        // Fetch caregiver data
        const response = await axios.get("http://localhost:8080/api/caregiver/application", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.data) {
          throw new Error("No caregiver data received");
        }

        setCaregiver(response.data);

        // Only fetch bookings if we have a valid caregiver ID
        if (response.data.id) {
          const bookingsResponse = await axios.get(`http://localhost:8080/api/bookings/caregiver/${response.data.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          setBookings(bookingsResponse.data || []);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching caregiver data:", err);
        
        if (err.response) {
          if (err.response.status === 401) {
            setError("Your session has expired. Please log in again.");
          } else if (err.response.status === 404) {
            setError("No caregiver application found. Please submit an application first.");
          } else {
            setError(`Failed to load data: ${err.response.data?.message || err.message}`);
          }
        } else {
          setError("Network error. Please check your connection.");
        }
        
        setLoading(false);
      }
    };

    fetchCaregiverData();
  }, [token]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data) {
          setNotifications(response.data);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
        if (err.response) {
          if (err.response.status === 401) {
            setError("Your session has expired. Please log in again.");
          } else if (err.response.status === 403) {
            setError("You are not authorized to view notifications.");
          } else if (err.response.status === 404) {
            setError("No notifications found.");
          } else if (err.response.status === 500) {
            setError(`Server error: ${err.response.data?.message || "Please try again later"}`);
          } else {
            setError(`Error fetching notifications: ${err.response.data?.message || err.message}`);
          }
        } else {
          setError("Network error. Please check your connection.");
        }
        setNotifications([]);
      }
    };

    if (caregiver.id) {
      fetchNotifications();
    }
  }, [caregiver.id, token]);

  const handleBookingAction = async (bookingId, action) => {
    try {
      if (!token) {
        setError("Authentication token not found. Please log in again.");
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
      const bookingsResponse = await axios.get(`http://localhost:8080/api/bookings/caregiver/${caregiver.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBookings(bookingsResponse.data);
    } catch (err) {
      console.error("Error updating booking:", err);
      if (err.response) {
        // Handle specific error cases
        if (err.response.status === 401) {
          setError("You are not authenticated. Please log in again.");
        } else if (err.response.status === 403) {
          setError("You are not authorized to perform this action.");
        } else if (err.response.status === 404) {
          setError("Booking not found.");
        } else {
          setError(err.response.data?.message || "Failed to update booking");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  const handleRejectSubmit = async () => {
    try {
      if (!token) {
        setError("Authentication token not found. Please log in again.");
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
      const response = await axios.get(`http://localhost:8080/api/bookings/caregiver/${caregiver.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBookings(response.data);
      setShowRejectModal(false);
      setRejectionReason("");
      setSelectedBooking(null);
    } catch (err) {
      console.error("Error rejecting booking:", err);
      setError("Failed to reject booking: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading caregiver data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-xl text-red-600 mb-4">{error}</div>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => window.location.href = "/caregiver-form"}
        >
          Apply as Caregiver
        </button>
      </div>
    );
  }

  // Format services into an array if it's a string
  const servicesList = Array.isArray(caregiver.services) 
    ? caregiver.services 
    : (caregiver.services ? caregiver.services.split(',').map(s => s.trim()) : []);

  // Format full address
  const fullAddress = [
    caregiver.address,
    caregiver.city,
    caregiver.pincode
  ].filter(Boolean).join(', ');

  // Get initials for profile picture
  const initials = `${caregiver.firstName.charAt(0)}${caregiver.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto mt-8 mb-8 bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row items-center mb-8 pb-5 border-b border-gray-200">
          <div className="mb-4 md:mb-0 md:mr-8">
            <div className={`w-36 h-36 rounded-full ${getRandomColor(caregiver.firstName)} flex items-center justify-center text-white text-6xl font-bold`}>
              {initials}
            </div>
            <div className="mt-2 text-sm text-blue-700 cursor-pointer text-center">
              Change Photo
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {caregiver.firstName} {caregiver.lastName}
            </h1>
            <p className="text-gray-600">Professional Caregiver</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-gray-100">
              Personal Information
            </h2>
            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1">
                Full Name
              </label>
              <div className="p-2 bg-gray-50 rounded text-gray-800">
                {caregiver.firstName} {caregiver.lastName}
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1">
                Phone Number
              </label>
              <div className="p-2 bg-gray-50 rounded text-gray-800">
                {caregiver.phone}
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1">
                Email Address
              </label>
              <div className="p-2 bg-gray-50 rounded text-gray-800">
                {caregiver.email}
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1">
                Address
              </label>
              <div className="p-2 bg-gray-50 rounded text-gray-800">
                {fullAddress}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-gray-100">
              Professional Details
            </h2>
            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1">
                Services Offered
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {servicesList.map((service, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1">
                Years of Experience
              </label>
              <div className="p-2 bg-gray-50 rounded text-gray-800">
                {caregiver.experience}
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1">
                Hourly Rate
              </label>
              <div className="p-2 bg-gray-50 rounded text-gray-800">
                ₹{caregiver.hourlyRate}/hour
              </div>
            </div>
          </div>  
        </div>

        {/* Notifications Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-gray-100 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </h2>
          
          {notifications.length === 0 ? (
            <p className="text-gray-600">No new notifications</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
                >
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bookings Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-gray-100">
            Pending Bookings
          </h2>
          
          {bookings.length === 0 ? (
            <p className="text-gray-600">No pending bookings</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Booking #{booking.id}</p>
                      <p className="text-sm text-gray-600">User ID: {booking.userId}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBookingAction(booking.id, "accept")}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleBookingAction(booking.id, "reject")}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
      </div>
    </div>
  );
}

export default CaregiverDashboard;