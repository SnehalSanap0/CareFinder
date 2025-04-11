import React, { useState } from "react";
import { Search, Filter, MapPin, Clock, Star } from "lucide-react";

const FindCaregiver = () => {
  const [filters, setFilters] = useState({
    serviceType: "childcare",
    location: "",
    availability: "anytime",
    experience: "any",
    rating: 0,
  });

  // Mock data for caregivers
  const caregivers = [
    {
      id: 1,
      name: "Jessica M.",
      photo: "/api/placeholder/80/80",
      location: "New York, NY",
      distance: "2.5 miles away",
      rating: 4.9,
      reviews: 42,
      hourlyRate: "$22-25",
      experience: "7 years",
      bio: "Experienced childcare provider with a background in early childhood education. CPR certified and comfortable with all ages.",
      services: ["Child Care", "Homework Help", "Meal Preparation"],
    },
    {
      id: 2,
      name: "Robert J.",
      photo: "/api/placeholder/80/80",
      location: "New York, NY",
      distance: "3.8 miles away",
      rating: 4.7,
      reviews: 38,
      hourlyRate: "$24-28",
      experience: "5 years",
      bio: "Former teacher with a passion for childcare. I specialize in educational activities and helping with homework.",
      services: ["Child Care", "Tutoring", "Special Needs"],
    },
    {
      id: 3,
      name: "Maria S.",
      photo: "/api/placeholder/80/80",
      location: "New York, NY",
      distance: "1.2 miles away",
      rating: 5.0,
      reviews: 63,
      hourlyRate: "$26-30",
      experience: "10 years",
      bio: "Loving and attentive caregiver with experience working with children of all ages. First aid and CPR certified.",
      services: ["Child Care", "Infant Care", "Meal Preparation"],
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
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
                onChange={(e) =>
                  handleFilterChange("serviceType", e.target.value)
                }
                className="focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-3 border border-gray-300 rounded-md"
              >
                <option value="childcare">Child Care</option>
                <option value="seniorcare">Senior Care</option>
                <option value="petcare">Pet Care</option>
                <option value="housekeeping">House Keeping</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 gap-6">
          {caregivers.map((caregiver) => (
            <div
              key={caregiver.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 mb-4 sm:mb-0">
                    <img
                      className="h-20 w-20 rounded-full object-cover"
                      src={caregiver.photo}
                      alt={`${caregiver.name} profile`}
                    />
                  </div>

                  <div className="sm:ml-6 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {caregiver.name}
                        </h2>
                        <p className="text-gray-500 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {caregiver.location} ({caregiver.distance})
                        </p>
                      </div>

                      <div className="mt-2 sm:mt-0 text-right">
                        <div className="flex items-center justify-end">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span className="ml-1 font-medium">
                            {caregiver.rating}
                          </span>
                          <span className="ml-1 text-gray-500">
                            ({caregiver.reviews} reviews)
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          {caregiver.hourlyRate}/hr
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-600">{caregiver.bio}</p>

                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          Services:
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {caregiver.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{caregiver.experience} experience</span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col sm:flex-row sm:justify-end gap-3">
                      <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        View Profile
                      </button>
                      <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              {/* Chevron left icon */}
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-blue-50"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              2
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              3
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              {/* Chevron right icon */}
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default FindCaregiver;
