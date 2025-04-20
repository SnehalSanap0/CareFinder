import React, { createContext, useContext, useState, useEffect } from "react";

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [isCaretaker, setIsCaretaker] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    const storedIsCaretaker = localStorage.getItem("isCaretaker") === "true";
    const storedRoles = JSON.parse(localStorage.getItem("userRoles") || "[]");

    if (storedToken && storedUsername && storedUserId) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserId(Number(storedUserId)); // Ensure userId is a number
      setIsCaretaker(storedIsCaretaker);
      setUserRoles(storedRoles);
      setToken(storedToken);
    } else {
      // Clear any partial state if we don't have all required data
      setIsLoggedIn(false);
      setUsername("");
      setUserId(null);
      setIsCaretaker(false);
      setUserRoles([]);
      setToken("");
    }

    setIsLoading(false);
  }, []);

  const login = (newToken, name, id, caretakerStatus, roles = []) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      console.error("Invalid user ID provided:", id);
      return;
    }

    localStorage.setItem("token", newToken);
    localStorage.setItem("username", name);
    localStorage.setItem("userId", numericId.toString());
    localStorage.setItem("isCaretaker", caretakerStatus);
    localStorage.setItem("userRoles", JSON.stringify(roles || []));
    
    setIsLoggedIn(true);
    setUsername(name);
    setUserId(numericId);
    setIsCaretaker(caretakerStatus);
    setUserRoles(roles || []);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("isCaretaker");
    localStorage.removeItem("userRoles");
    
    setIsLoggedIn(false);
    setUsername("");
    setUserId(null);
    setIsCaretaker(false);
    setUserRoles([]);
    setToken("");
  };

  const value = {
    isLoggedIn,
    username,
    userId,
    isCaretaker,
    userRoles,
    token,
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