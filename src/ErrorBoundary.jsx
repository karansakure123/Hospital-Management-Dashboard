import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// AuthContext and AuthProvider
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://hospital-management-backend-3.onrender.com/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
        localStorage.setItem("isAuthenticated", "true");
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
        localStorage.removeItem("isAuthenticated");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "https://hospital-management-backend-3.onrender.com/api/v1/user/admin/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      setAdmin({});
      localStorage.removeItem("isAuthenticated");
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
