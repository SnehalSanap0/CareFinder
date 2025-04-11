import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content:
        "Finding a nanny for our twins was so easy with CareFinder. We interviewed several qualified candidates and found the perfect match within a week!",
      author: "Sarah Johnson",
      role: "Parent of twins",
    },
    {
      id: 2,
      content:
        "I've been able to build a full-time career as a caregiver thanks to CareFinder. The platform makes it easy to connect with families who need my services.",
      author: "Michael Rodriguez",
      role: "Professional Caregiver",
    },
    {
      id: 3,
      content:
        "When we needed to find senior care for my mother, CareFinder connected us with compassionate, experienced caregivers who have made such a difference in her life.",
      author: "Jennifer Lee",
      role: "Family Member",
    },
  ];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What our users are saying
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Thousands of families and caregivers have found their perfect match
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-lg shadow-md p-6 border border-gray-200 hover:border-blue-300 transition-colors duration-300"
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <svg
                      className="h-8 w-8 text-blue-400 mb-4"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">
                          {testimonial.author}
                        </h4>
                        <p className="text-gray-500">{testimonial.role}</p>
                      </div>
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

export default Testimonials;
