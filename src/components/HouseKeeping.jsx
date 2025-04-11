import React, { useState, useEffect } from "react";

const Housekeeping = () => {
  // State management
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Regular Cleaning",
      price: 120,
      description:
        "Standard cleaning including vacuuming, dusting, bathroom and kitchen cleaning",
    },
    {
      id: 2,
      name: "Deep Cleaning",
      price: 240,
      description:
        "Intensive cleaning of all areas including behind furniture, inside appliances, windows",
    },
    {
      id: 3,
      name: "Move-in/Move-out",
      price: 280,
      description:
        "Complete cleaning for moving situations, including cabinets, appliances, walls",
    },
    {
      id: 4,
      name: "Post-Construction",
      price: 350,
      description: "Removing dust and debris after construction or renovation",
    },
  ]);

  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCleaner, setSelectedCleaner] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    specialInstructions: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Simulate fetching cleaners from Care.com-like API
  useEffect(() => {
    const fetchCleaners = async () => {
      try {
        // This would be an actual API call in a real application
        // const response = await fetch('https://api.care.com/v1/housekeepers?zipcode=${zipCode}');
        // const data = await response.json();

        // Simulated response data
        setTimeout(() => {
          const mockCleaners = [
            {
              id: 101,
              name: "Maria G.",
              hourlyRate: 35,
              rating: 4.9,
              reviews: 127,
              yearsExperience: 7,
              backgroundChecked: true,
              image: "/api/placeholder/100/100",
            },
            {
              id: 102,
              name: "Robert J.",
              hourlyRate: 32,
              rating: 4.7,
              reviews: 84,
              yearsExperience: 5,
              backgroundChecked: true,
              image: "/api/placeholder/100/100",
            },
            {
              id: 103,
              name: "Sarah K.",
              hourlyRate: 38,
              rating: 5.0,
              reviews: 93,
              yearsExperience: 9,
              backgroundChecked: true,
              image: "/api/placeholder/100/100",
            },
          ];
          setCleaners(mockCleaners);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load housekeepers. Please try again later.");
        setLoading(false);
      }
    };

    if (zipCode.length === 5) {
      setLoading(true);
      fetchCleaners();
    }
  }, [zipCode]);

  // Handle zip code search
  const handleZipCodeSearch = (e) => {
    e.preventDefault();
    if (zipCode.length === 5) {
      // This would trigger the useEffect above
    }
  };

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowBookingForm(true);
  };

  // Handle cleaner selection
  const handleCleanerSelect = (cleaner) => {
    setSelectedCleaner(cleaner);
  };

  // Handle contact info changes
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle booking submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to create booking
    setTimeout(() => {
      setBookingSuccess(true);
      // Reset form data after successful booking
      setTimeout(() => {
        setBookingSuccess(false);
        setShowBookingForm(false);
        setSelectedService(null);
        setSelectedCleaner(null);
        setBookingDate("");
        setBookingTime("");
        setContactInfo({
          name: "",
          email: "",
          phone: "",
          address: "",
          specialInstructions: "",
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Professional Housekeeping Services
        </h1>
        <p className="text-gray-600">
          Trusted and verified cleaners, just like on Care.com
        </p>
      </header>

      {/* Zip Code Search */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Find Housekeepers in Your Area
        </h2>
        <form onSubmit={handleZipCodeSearch} className="flex flex-wrap gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Enter ZIP Code"
              className="w-full p-3 border border-gray-300 rounded"
              value={zipCode}
              onChange={(e) =>
                setZipCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))
              }
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
            disabled={zipCode.length !== 5}
          >
            Search
          </button>
        </form>
      </div>

      {/* Services Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Our Cleaning Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                selectedService?.id === service.id
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : ""
              }`}
              onClick={() => handleServiceSelect(service)}
            >
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="font-bold text-xl">${service.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Available Cleaners Section */}
      {zipCode.length === 5 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Available Housekeepers
          </h2>

          {loading && (
            <p className="text-center p-8">Loading available housekeepers...</p>
          )}

          {error && <p className="text-center text-red-500 p-8">{error}</p>}

          {!loading && !error && cleaners.length === 0 && (
            <p className="text-center p-8">
              No housekeepers found in your area. Try a different ZIP code.
            </p>
          )}

          {!loading && !error && cleaners.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cleaners.map((cleaner) => (
                <div
                  key={cleaner.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedCleaner?.id === cleaner.id
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => handleCleanerSelect(cleaner)}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={cleaner.image}
                      alt={cleaner.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{cleaner.name}</h3>
                      <p className="text-gray-600">
                        ${cleaner.hourlyRate}/hour
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>
                        {cleaner.rating} ({cleaner.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {cleaner.yearsExperience} years experience
                    </p>
                    {cleaner.backgroundChecked && (
                      <p className="text-green-600 text-sm font-medium mt-1">
                        ✓ Background checked
                      </p>
                    )}
                  </div>

                  <button
                    className={`w-full py-2 rounded font-medium mt-2 ${
                      selectedCleaner?.id === cleaner.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedCleaner?.id === cleaner.id ? "Selected" : "Select"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Booking Form */}
      {showBookingForm && (
        <section className="mb-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">
            Book Your Cleaning Service
          </h2>

          {bookingSuccess ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded text-center">
              <p className="text-xl font-semibold mb-2">Booking Confirmed!</p>
              <p>
                Thank you for your booking. You will receive a confirmation
                email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-6 p-4 bg-blue-50 rounded">
                <h3 className="font-semibold mb-2">Selected Service</h3>
                {selectedService && (
                  <div>
                    <p className="font-medium">
                      {selectedService.name} - ${selectedService.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedService.description}
                    </p>
                  </div>
                )}
              </div>

              {selectedCleaner && (
                <div className="mb-6 p-4 bg-blue-50 rounded">
                  <h3 className="font-semibold mb-2">Selected Housekeeper</h3>
                  <div className="flex items-center">
                    <img
                      src={selectedCleaner.image}
                      alt={selectedCleaner.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-medium">{selectedCleaner.name}</p>
                      <p className="text-sm text-gray-600">
                        ${selectedCleaner.hourlyRate}/hour •{" "}
                        {selectedCleaner.rating} ★
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Time
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    required
                  >
                    <option value="">Select a time</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={contactInfo.name}
                      onChange={handleContactInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={contactInfo.email}
                      onChange={handleContactInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={contactInfo.phone}
                      onChange={handleContactInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={contactInfo.address}
                      onChange={handleContactInfoChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Special Instructions
                </label>
                <textarea
                  name="specialInstructions"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded"
                  value={contactInfo.specialInstructions}
                  onChange={handleContactInfoChange}
                  placeholder="Any specific areas to focus on, pets in the home, entry instructions, etc."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-6 py-3 mr-4 border border-gray-300 rounded font-semibold"
                  onClick={() => setShowBookingForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          )}
        </section>
      )}

      {/* Trust and Safety Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Why Choose Our Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="text-blue-600 text-4xl mb-4">✓</div>
            <h3 className="text-lg font-semibold mb-2">
              Verified Professionals
            </h3>
            <p className="text-gray-600">
              All housekeepers undergo background checks and verification
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-blue-600 text-4xl mb-4">🛡️</div>
            <h3 className="text-lg font-semibold mb-2">Insured & Bonded</h3>
            <p className="text-gray-600">
              Services are insured for your peace of mind
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-blue-600 text-4xl mb-4">⭐</div>
            <h3 className="text-lg font-semibold mb-2">
              Satisfaction Guaranteed
            </h3>
            <p className="text-gray-600">
              Not satisfied? We'll make it right or refund your payment
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-8 text-center text-gray-600">
        <p className="mb-4">
          © 2025 Housekeeping Services. All rights reserved.
        </p>
        <p className="text-sm">
          Inspired by Care.com's trusted platform for connecting households with
          quality service providers.
        </p>
      </footer>
    </div>
  );
};

export default Housekeeping;
