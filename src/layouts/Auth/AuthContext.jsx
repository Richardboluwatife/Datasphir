// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// AuthProvider component
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(
        "https://rent-management-service.onrender.com/auth/users/me/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        }
      );

      if (response.ok) {
        const userData = await response.json();
        console.log("Fetched User Data:", userData); // Log user data to the console
        setCurrentUser(userData);
      } else {
        handleUnauthorized();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      handleUnauthorized();
    }
  };


  const login = async (email, password) => {
    try {
      const response = await fetch(
        "https://rent-management-service.onrender.com/auth/jwt/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          redirect: "follow",
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.access && data.refresh) {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          await fetchUserData(data.access);
        } else {
          console.error("Missing tokens in response:", data);
        }
      } else {
        console.error("Login failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleUnauthorized = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setCurrentUser(null);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
