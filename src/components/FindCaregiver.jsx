import React, { useState, useEffect } from "react";
import { Search, Filter, MapPin, Clock, Star } from "lucide-react";
import axios from "axios";
import BookBtn from "./BookBtn";
import { useAuth } from "../AuthContext";

const FindCaregiver = () => {
  const { username, isLoggedIn, userId } = useAuth();
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    serviceType: "",
    location: "",
    availability: "anytime",
    experience: "any",
    rating: 0,
  });

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const fetchCaregivers = async () => {
    try {
      setLoading(true);
      // Build query parameters based on filters
      const params = new URLSearchParams();
      if (filters.serviceType) params.append('serviceType', filters.serviceType);
      if (filters.location) params.append('location', filters.location);
      
      const response = await axios.get(`http://localhost:8080/api/caregiver/list?${params}`);
      setCaregivers(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching caregivers:", err);
      setError("Failed to load caregivers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCaregivers();
  };

  // Function to get image URL (or placeholder if not available)
  const getImageUrl = (qrCodePath) => {
    return "/api/placeholder/80/80";
  };

  const initials = (firstName, lastName) => {
    return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
  };
  const getRandomColor = (name) => {
    if (!name) return 'bg-gray-400';
    
    const colors = [
      'bg-red-400', 'bg-blue-400', 'bg-green-400', 
      'bg-yellow-400', 'bg-purple-400', 'bg-pink-400',
      'bg-indigo-400',  'bg-orange-400'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Find the Perfect Caregiver
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse verified caregivers in your area and find the perfect match
            for your family's needs.
          </p>
        </div>

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                  placeholder="Search by name or keyword"
                />
              </div>

              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                  placeholder="City, state, or zip code"
                />
              </div>

              <div>
                <select
                  value={filters.serviceType}
                  onChange={(e) => handleFilterChange("serviceType", e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-3 border border-gray-300 rounded-md"
                >
                  <option value="">All Services</option>
                  <option value="Child Care">Child Care</option>
                  <option value="Senior Care">Senior Care</option>
                  <option value="Pet Care">Pet Care</option>
                  <option value="House Keeping">House Keeping</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </button>
              
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Loading and error states */}
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading caregivers...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Results */}
        {!loading && !error && caregivers.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">No caregivers found matching your criteria.</p>
          </div>
        )}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {caregivers.map((caregiver) => (
    <div
      key={caregiver.id}
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
        <div className={`w-36 h-36 rounded-full ${getRandomColor(caregiver.firstName)} flex items-center justify-center text-white text-6xl font-bold`}>
          {initials(caregiver.firstName, caregiver.lastName)}
        </div>
          <h2 className="text-lg font-semibold text-gray-900 mt-4">
            {caregiver.firstName} {caregiver.lastName}
          </h2>
          <p className="text-sm text-gray-500 flex items-center justify-center mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {caregiver.address},{caregiver.city},  {caregiver.pincode}
          </p>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Experience</span>
            <span className="flex items-center text-sm text-gray-700">
              <Clock className="h-4 w-4 mr-1" />
              {caregiver.experience}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Services</h3>
            <div className="flex flex-wrap gap-2">
              {caregiver.services && caregiver.services.map((service, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-500 text-sm">Rate</span>
            <span className="text-blue-600 font-semibold">₹{caregiver.hourlyRate}/hr</span>
          </div>
        </div>

        <div className="mt-5">
            {isLoggedIn ? (
              <BookBtn caregiverId={caregiver.id} />
            ) : (
              <button 
                className="w-full inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 cursor-not-allowed"
                disabled
              >
                Login to Book
              </button>
            )}
        </div>
      </div>
    </div>
  ))}
</div>

        
      </div>
    </div>
  );
};

export default FindCaregiver;