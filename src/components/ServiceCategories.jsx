import React from "react";

const ServiceCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Child Care",
      description: "Find babysitters, nannies, and daycare providers",
      icon: "👶",
    },
    {
      id: 2,
      title: "Senior Care",
      description: "Connect with compassionate elder care specialists",
      icon: "👵",
    },
    {
      id: 3,
      title: "Pet Care",
      description: "Discover reliable pet sitters and dog walkers",
      icon: "🐕",
    },
    {
      id: 4,
      title: "Housekeeping",
      description: "Hire housekeepers and cleaning professionals",
      icon: "🧹",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Find care for what matters most
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Browse our wide range of care services to find exactly what you need
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.id} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg text-3xl">
                        {category.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {category.description}
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Learn more &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
