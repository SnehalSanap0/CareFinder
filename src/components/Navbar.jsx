import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User as UserIcon, LogOut } from "lucide-react";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, username, logout, isCaretaker } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle dropdown visibility
  const toggleDesktopDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle mobile dropdown visibility
  const toggleMobileDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Determine dashboard path based on user role
  const getDashboardPath = () => {
    return isCaretaker ? "/caregiver-dashboard" : "/user-dashboard";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              CareFinder
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === "/" 
                    ? "text-gray-900 border-b-2 border-blue-500" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={toggleDesktopDropdown}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none"
                >
                  Services{" "}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    } transition-transform duration-200`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/child-care"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Child Care
                    </Link>
                    <Link
                      to="/senior-care"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Senior Care
                    </Link>
                    <Link
                      to="/pet-care"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Pet Care
                    </Link>
                    <Link
                      to="/house-keeping"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      House Keeping
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/how-it-works"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === "/how-it-works" 
                    ? "text-gray-900 border-b-2 border-blue-500" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                How it Works
              </Link>
              <Link
                to="/safety"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === "/safety" 
                    ? "text-gray-900 border-b-2 border-blue-500" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Safety
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to={getDashboardPath()} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  <UserIcon className="h-4 w-4 mr-1" />
                  {username}
                  {isCaretaker && <span className="ml-1 text-xs text-blue-600">(Caregiver)</span>}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                location.pathname === "/" 
                  ? "text-blue-700 bg-blue-50" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={toggleMobileDropdown}
                className="w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 flex justify-between items-center"
              >
                Services{" "}
                <ChevronDown
                  className={`ml-2 h-4 w-4 transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  } transition-transform duration-200`}
                />
              </button>
              {isDropdownOpen && (
                <div className="pl-6 space-y-1 py-1">
                  <Link
                    to="/child-care"
                    className="block pl-3 pr-4 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Child Care
                  </Link>
                  <Link
                    to="/senior-care"
                    className="block pl-3 pr-4 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Senior Care
                  </Link>
                  <Link
                    to="/pet-care"
                    className="block pl-3 pr-4 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Pet Care
                  </Link>
                  <Link
                    to="/house-keeping"
                    className="block pl-3 pr-4 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    House Keeping
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/how-it-works"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            >
              How it Works
            </Link>
            <Link
              to="/safety"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            >
              Safety
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col items-center">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center mb-4">
                    <Link 
                      to={getDashboardPath()}
                      className="flex items-center"
                    >
                      <UserIcon className="h-5 w-5 mr-2 text-gray-700 cursor-pointer" />
                      <span className="text-base font-medium text-gray-700">
                        {username}
                        {isCaretaker && <span className="ml-1 text-xs text-blue-600">(Caregiver)</span>}
                      </span>
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 text-base font-medium text-red-600 hover:text-red-800"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-base font-medium text-blue-600 hover:text-blue-800"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="block mt-2 px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;