import React from "react";
import {
  User,
  Search,
  MessageSquare,
  CreditCard,
  Shield,
  BadgeCheck,
  Star,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Create an Account",
      description: "Sign up using mobile OTP verification for secure access",
      icon: <User className="h-6 w-6 text-blue-600" />,
      verification: "Mobile OTP authentication",
    },
    {
      number: 2,
      title: "Verify Identity & Background",
      description: "Caregivers submit Aadhaar, PAN, and police verification",
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      verification: "Aadhaar, PAN, Police verification",
    },
    {
      number: 3,
      title: "Search & Compare Caregivers",
      description: "View detailed profiles with ratings and trust badges",
      icon: <Search className="h-6 w-6 text-blue-600" />,
      verification: "Verified reviews and ratings",
    },
    {
      number: 4,
      title: "Connect & Schedule",
      description: "Chat, call, or video interview caregivers securely",
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      verification: "In-app communication",
    },
    {
      number: 5,
      title: "Book & Pay Securely",
      description: "Pay via Razorpay/UPI with escrow protection",
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      verification: "Escrow payment protection",
    },
    {
      number: 6,
      title: "Rate & Review",
      description: "Share feedback after service completion",
      icon: <Star className="h-6 w-6 text-blue-600" />,
      verification: "Verified user reviews",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How CareFinder Works in India
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our 6-step verification process ensures you connect with trusted
            caregivers
          </p>
        </div>

        {/* Timeline Progress Bar */}
        <div className="hidden md:flex mb-12">
          <div className="flex items-center w-full">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="relative flex flex-col items-center">
                  <div
                    className={`rounded-full h-10 w-10 flex items-center justify-center 
                    ${
                      index === 0
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    } 
                    transition-all duration-300`}
                  >
                    {step.number}
                  </div>
                  <div className="absolute top-full mt-2 w-32 text-center text-sm font-medium text-gray-700">
                    {step.title.split(" ")[0]}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-auto border-t-2 ${
                      index === 0 ? "border-blue-600" : "border-gray-200"
                    } 
                    transition-all duration-500`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile Step Indicators */}
        <div className="md:hidden flex justify-center mb-8">
          <div className="flex space-x-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-full h-8 w-8 flex items-center justify-center bg-blue-100 text-blue-600"
              >
                {step.number}
              </div>
            ))}
          </div>
        </div>

        {/* Accordion Steps */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group rounded-lg bg-gray-50 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white cursor-pointer"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-4 group-hover:bg-blue-200 transition-colors">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    {step.title}
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <BadgeCheck className="mr-1 h-3 w-3" />
                      Verified
                    </span>
                  </h3>
                  <p className="mt-1 text-gray-600">{step.description}</p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Shield className="flex-shrink-0 mr-1.5 h-4 w-4 text-blue-400" />
                    <span>{step.verification}</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 self-center">
                  <svg
                    className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors duration-300 transform hover:scale-105"
          >
            Get Started with OTP Verification
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
