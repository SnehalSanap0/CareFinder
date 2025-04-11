// import React, { createContext, useContext, useState, useEffect } from "react";

// // Create auth context
// const AuthContext = createContext();

// // Auth provider component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   // Check authentication status on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");
    
//     if (token && storedUsername) {
//       setIsLoggedIn(true);
//       setUsername(storedUsername);
//     }
    
//     setIsLoading(false);
//   }, []);

//   // Login function
//   const login = (token, name) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("username", name);
//     setIsLoggedIn(true);
//     setUsername(name);
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("isCaretaker");
//     setIsLoggedIn(false);
//     setUsername("");
//   };

//   // Value object to be provided to consumers
//   const value = {
//     isLoggedIn,
//     username,
//     login,
//     logout,
//     isLoading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => useContext(AuthContext);

// export default AuthContext;
import React, { createContext, useContext, useState, useEffect } from "react";

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    setIsLoading(false);
  }, []);

  const login = (token, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", name);
    setIsLoggedIn(true);
    setUsername(name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isCaretaker");
    setIsLoggedIn(false);
    setUsername("");
  };

  const value = {
    isLoggedIn,
    username,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
