// import React, { createContext, useContext, useState, useEffect } from "react";

// // Create auth context
// const AuthContext = createContext();

// // Auth provider component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");

//     if (token && storedUsername) {
//       setIsLoggedIn(true);
//       setUsername(storedUsername);
//     }

//     setIsLoading(false);
//   }, []);

//   const login = (token, name) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("username", name);
//     setIsLoggedIn(true);
//     setUsername(name);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("isCaretaker");
//     setIsLoggedIn(false);
//     setUsername("");
//   };

//   const value = {
//     isLoggedIn,
//     username,
//     login,
//     logout,
//     isLoading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState, useEffect } from "react";

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isCaretaker, setIsCaretaker] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedIsCaretaker = localStorage.getItem("isCaretaker") === "true";
    const storedRoles = JSON.parse(localStorage.getItem("userRoles") || "[]");

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setIsCaretaker(storedIsCaretaker);
      setUserRoles(storedRoles);
    }

    setIsLoading(false);
  }, []);

  const login = (token, name, caretakerStatus, roles = []) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", name);
    localStorage.setItem("isCaretaker", caretakerStatus);
    localStorage.setItem("userRoles", JSON.stringify(roles || []));
    
    setIsLoggedIn(true);
    setUsername(name);
    setIsCaretaker(caretakerStatus);
    setUserRoles(roles || []);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isCaretaker");
    localStorage.removeItem("userRoles");
    
    setIsLoggedIn(false);
    setUsername("");
    setIsCaretaker(false);
    setUserRoles([]);
  };

  const value = {
    isLoggedIn,
    username,
    isCaretaker,
    userRoles,
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

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);