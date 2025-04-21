import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  FileText,
  CheckCircle,
  Banknote,
  Languages,
  QrCode,
  Briefcase
} from "lucide-react";

const CaregiverApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("caregiverApplication");
    return savedData
      ? JSON.parse(savedData)
      : {
          // Personal Info
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          city: "",
          pincode: "",

          // Professional
          certifications: [],
          references: [{ name: "", phone: "", relation: "" }],

          // Verification
          phone: "",
          

          // Payment
          qrCode: null,
        };
  });

  useEffect(() => {
    localStorage.setItem("caregiverApplication", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0].size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }
    setFormData({ ...formData, [name]: files[0] });
  };

  const sendOTP = () => {
    // In a real app, you would send OTP via SMS API
    alert("OTP sent to your mobile number (bypassed for testing)");
  };

  const verifyOTP = () => {
    // In a real app, you would verify the OTP
    setFormData({ ...formData, phoneVerified: true });
    alert("Mobile number verified successfully (bypassed for testing)");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create a FormData object
      const submitData = new FormData();
      
      // Create application data as JSON
      const applicationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        services: formData.services || [],
        experience: formData.experience,
        hourlyRate: formData.hourlyRate
      };
      
      // Add application data as JSON string
      submitData.append('application', new Blob([JSON.stringify(applicationData)], 
        { type: 'application/json' }));
      
      // Add QR code if exists
      if (formData.qrCode) {
        submitData.append('qrCode', formData.qrCode);
      }

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/caregiver/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        // Clear form or redirect
        localStorage.removeItem('caregiverApplication');
        // You might want to redirect here, e.g.:
        // window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
         
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Progress Tracker */}
          <div className="px-8 pt-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
              Become a Caregiver
            </h1>
            <div className="flex justify-between items-center mt-8 mb-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-2 ${
                      step >= stepNumber
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <div className="text-xs font-medium text-center text-gray-500">
                    {stepNumber === 1
                      ? "Personal"
                      : stepNumber === 2
                      ? "Professional"
                      : "Payment"}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>

          <form className="p-8" onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number*
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div> */}
                  <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Mobile Number*
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Phone className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      required
      pattern="[0-9]{10}"
      maxLength="10"
      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      placeholder="10-digit mobile number"
    />
  </div>
</div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* City/Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code*
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{6}"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                  >
                    Next : Professional Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Professional Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                  Professional Details
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Services You Offer*
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Child Care",
                      "Pet Care",
                      "Senior Care",
                      "Housekeeping",
                    ].map((service) => (
                      <div key={service} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`service-${service}`}
                          name="services"
                          value={service}
                          checked={formData.services?.includes(service)}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                            setFormData({
                              ...formData,
                              services: checked
                                ? [...(formData.services || []), value]
                                : (formData.services || []).filter((s) => s !== value),
                            });
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`service-${service}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience*
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                  >
                    Next : Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Banknote className="h-5 w-5 mr-2 text-blue-500" />
                  Payment Information
                </h2>
              
                {/* Service Charges Field */}
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800 mb-3">Service Charges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rate (₹)*
                      </label>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full rounded-md border-gray-300 shadow-sm"
                        placeholder="e.g., 200"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Please specify your standard rates. These can be adjusted for specific cases later.
                  </p>
                </div>
              
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800 mb-3">Payment Method</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload UPI QR Code*
                      </label>
                      <input
                        type="file"
                        name="qrCode"
                        onChange={handleFileChange}
                        required
                        accept=".jpg,.jpeg,.png"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Upload a clear image of your UPI QR code (JPEG/PNG)
                      </p>
                      {formData.qrCode && (
                        <div className="mt-2 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4 inline mr-1" />
                          QR Code uploaded
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <QrCode className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Payments will be sent to your UPI ID weekly
                      </span>
                    </div>
                  </div>
                </div>
              
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaregiverApplicationForm;