import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const careOptions = ["family", "children", "pets", "seniors", "home", "loved ones"];
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    
    const handleTyping = () => {
      const currentWord = careOptions[currentWordIndex];
      const typingSpeed = isDeleting ? 80 : 120; // Faster when deleting
      
      if (!isDeleting) {
        // Typing forward
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        
        // If word is complete, prepare to delete after a pause
        if (displayText.length === currentWord.length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500); // Wait 1.5 seconds before starting to delete
          return;
        }
      } else {
        // Deleting
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        
        // If deletion is complete, move to next word
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % careOptions.length);
          return;
        }
      }
      
      timeout = setTimeout(handleTyping, typingSpeed);
    };
    
    timeout = setTimeout(handleTyping, 100);
    
    return () => clearTimeout(timeout);
  }, [displayText, currentWordIndex, isDeleting, careOptions]);

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">
                  Find the perfect caregiver
                </span>{" "}
                <span className="block text-blue-600 mt-2">
                  for your <span className="inline-block min-w-[100px]">{displayText}</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Connect with trusted caregivers and care seekers for childcare,
                senior care, pet care, housekeeping, and more.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/find-caregiver"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Find a caregiver
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/become-caregiver"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                  >
                    Become a caregiver
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/api/placeholder/800/600"
          alt="Happy family with caregiver"
        />
      </div>
    </div>
  );
};

export default Hero;