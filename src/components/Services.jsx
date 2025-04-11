/*
import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* ChildCare */ /*}
        <Link
          to="/services/childcare"
          className="block bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-blue-600">Child Care</h2>
          <p className="text-gray-600 mt-2">
            Professional babysitting and child care services.
          </p>
        </Link>*/

{
  /* PetCare */
} /*
        <Link
          to="/services/petcare"
          className="block bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-green-600">Pet Care</h2>
          <p className="text-gray-600 mt-2">
            Trusted pet sitting and grooming services.
          </p>
        </Link>

        {/* SeniorCare */ /*}
        <Link
          to="/services/seniorcare"
          className="block bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-purple-600">Senior Care</h2>
          <p className="text-gray-600 mt-2">
            Compassionate elderly assistance and support.
          </p>
        </Link>

        {/* HouseKeeping */ /*}
        <Link
          to="/services/housekeeping"
          className="block bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-red-600">Housekeeping</h2>
          <p className="text-gray-600 mt-2">
            Reliable home cleaning and maintenance services.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Services;
*/
import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const serviceItems = [
    {
      id: "childcare",
      title: "Child Care",
      description: "Professional babysitting and child care services.",
      color: "blue",
      icon: "👶",
    },
    {
      id: "petcare",
      title: "Pet Care",
      description: "Trusted pet sitting and grooming services.",
      color: "green",
      icon: "🐾",
    },
    {
      id: "seniorcare",
      title: "Senior Care",
      description: "Compassionate elderly assistance and support.",
      color: "purple",
      icon: "👵",
    },
    {
      id: "housekeeping",
      title: "Housekeeping",
      description: "Reliable home cleaning and maintenance services.",
      color: "red",
      icon: "🧹",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceItems.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group block bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-2 hover:border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`text-2xl bg-${service.color}-100 p-3 rounded-full`}
                >
                  {service.icon}
                </div>
                <div>
                  <h2
                    className={`text-xl font-semibold text-${service.color}-600 group-hover:text-${service.color}-700`}
                  >
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                  <span
                    className={`inline-block mt-3 text-${service.color}-500 font-medium group-hover:underline`}
                  >
                    Learn more →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
