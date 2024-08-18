import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
        localStorage.setItem("isAuthenticated", "true"); // Store authentication status
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
        localStorage.removeItem("isAuthenticated"); // Clear status on error
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      // Call your logout API if needed
      await axios.post("http://localhost:3000/api/v1/user/admin/logout", {}, { withCredentials: true });
      
      setIsAuthenticated(false);
      setAdmin({});
      localStorage.removeItem("isAuthenticated"); // Clear local storage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
