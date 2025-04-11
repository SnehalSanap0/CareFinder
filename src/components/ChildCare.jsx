import React from "react";
import { Clock, Calendar, Star, Shield, Award, Check } from "lucide-react";

const ChildCare = () => {
  const services = [
    {
      title: "Babysitting",
      description:
        "Reliable childcare for occasional needs, date nights, or special events.",
      icon: <Clock className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Nannies",
      description:
        "Long-term, consistent childcare with added household help and educational support.",
      icon: <Calendar className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Tutoring",
      description:
        "Subject-specific academic help and educational enrichment for children of all ages.",
      icon: <Award className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Special Needs Care",
      description:
        "Specialized caregivers with experience supporting children with various needs.",
      icon: <Shield className="h-10 w-10 text-blue-500" />,
    },
  ];

  const caregivers = [
    {
      name: "Emma Thompson",
      image: "/api/placeholder/100/100",
      rating: 4.9,
      reviews: 156,
      experience: "5 years",
      specialties: ["Infant Care", "Arts & Crafts", "Meal Prep"],
    },
    {
      name: "Michael Rodriguez",
      image: "/api/placeholder/100/100",
      rating: 4.8,
      reviews: 103,
      experience: "7 years",
      specialties: ["Early Education", "Sports", "Special Needs"],
    },
    {
      name: "Sarah Johnson",
      image: "/api/placeholder/100/100",
      rating: 5.0,
      reviews: 89,
      experience: "4 years",
      specialties: ["Homework Help", "Music", "Multilingual"],
    },
  ];

  return (
    <div className="bg-grey-50 min-h-screen">
      {/* Hero section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Find the perfect childcare for your family
              </h1>
              <p className="mt-6 text-xl max-w-3xl">
                Connect with experienced, background-checked babysitters and
                nannies for reliable, personalized childcare that fits your
                schedule and needs.
              </p>
              <div className="mt-10">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Search for Childcare
                </a>
                <a
                  href="#"
                  className="ml-4 inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Placeholder for image */}
              <img
                src="src\assets\child.png"
                alt="Child care illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Childcare Services
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              We offer a variety of childcare options to meet your family's
              unique needs.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 text-center">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-500 text-center">
                  {service.description}
                </p>
                <div className="mt-4 text-center">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose CareFinder for Childcare?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              We prioritize safety, reliability, and quality care for your
              children.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="bg-blue-100 inline-flex items-center justify-center w-12 h-12 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Rigorous Screening
                </h3>
                <p className="mt-2 text-gray-600">
                  All childcare providers undergo extensive background checks,
                  reference verification, and interviews.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="bg-blue-100 inline-flex items-center justify-center w-12 h-12 rounded-full mb-4">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Experienced Caregivers
                </h3>
                <p className="mt-2 text-gray-600">
                  Our caregivers average 5+ years of childcare experience and
                  many have specialized training.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="bg-blue-100 inline-flex items-center justify-center w-12 h-12 rounded-full mb-4">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Perfect Match Guarantee
                </h3>
                <p className="mt-2 text-gray-600">
                  If you're not satisfied with your caregiver, we'll help you
                  find a better match at no additional cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured caregivers section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Caregivers
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Meet some of our top-rated childcare professionals.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {caregivers.map((caregiver, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 rounded-full"
                      src={caregiver.image}
                      alt={caregiver.name}
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        {caregiver.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-gray-600">
                          {caregiver.rating} ({caregiver.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Experience:</span>{" "}
                      {caregiver.experience}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">Specialties:</span>{" "}
                      {caregiver.specialties.join(", ")}
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Browse All Childcare Providers
            </a>
          </div>
        </div>
      </section>

      {/* Parent resources section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Resources for Parents
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Helpful guides, tips, and articles for families.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <a href="#" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src="/api/placeholder/400/200"
                  alt="Resource thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                    How to Choose the Right Nanny for Your Family
                  </h3>
                  <p className="mt-2 text-gray-500">
                    A comprehensive guide to finding the perfect childcare
                    match.
                  </p>
                </div>
              </div>
            </a>
            <a href="#" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src="/api/placeholder/400/200"
                  alt="Resource thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                    10 Questions to Ask During a Babysitter Interview
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Essential questions to help you find the right caregiver.
                  </p>
                </div>
              </div>
            </a>
            <a href="#" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src="/api/placeholder/400/200"
                  alt="Resource thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                    Creating a Positive Relationship with Your Caregiver
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Tips for building a successful partnership with your
                    childcare provider.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChildCare;
