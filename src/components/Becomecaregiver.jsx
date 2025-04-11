import React from "react";
import { Check, Users, DollarSign, Calendar, Shield, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";


const BecomeCaregiver = () => {
  const navigate = useNavigate();
  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6 text-blue-500" />,
      title: "Set Your Own Rates",
      description:
        "Decide how much you charge for your services and get paid securely.",
    },
    {
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      title: "Flexible Schedule",
      description:
        "Choose your own hours and work when it fits your lifestyle.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Connect with Families",
      description:
        "Find local families in need of childcare, pet care, and senior care.",
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "Safety & Security",
      description:
        "Secure payments, background checks, and identity verification for safety.",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Fill out your experience, skills, and availability.",
    },
    {
      step: "2",
      title: "Verify Your Identity",
      description: "Complete a background check to increase trust.",
    },
    {
      step: "3",
      title: "Set Your Preferences",
      description: "Choose the services you offer and set your pricing.",
    },
    {
      step: "4",
      title: "Start Receiving Requests",
      description: "Connect with families and start earning.",
    },
  ];
  

  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Earn Money as a Trusted Caregiver
              </h1>
              <p className="mt-4 text-lg text-blue-100">
                Join thousands of caregivers helping families while working on
                your own terms.
              </p>
              <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-50">
                Get Started
              </button>
            </div>
            <div className="hidden md:block">
              <img
                src="/api/placeholder/600/400"
                alt="Caregiver helping an elderly person"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Join Us?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Work on your schedule, earn competitive rates, and help families
              in need.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 bg-gray-100 rounded-lg shadow-md text-center"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Getting started is easy. Follow these simple steps.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What Caregivers Are Saying
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
              >
                <img
                  src="/api/placeholder/60/60"
                  alt="Caregiver"
                  className="h-12 w-12 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900">Emily R.</h3>
                <p className="text-gray-500">Child Care Provider</p>
                <p className="text-gray-600 italic mt-2">
                  "This platform helped me connect with amazing families and
                  earn a stable income on my schedule!"
                </p>
                <div className="flex justify-center text-yellow-400 mt-4">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-5 w-5" fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Start Your Journey Today!</h2>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-50" 
        onClick={() => navigate("/caregiver-form")} >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default BecomeCaregiver;
