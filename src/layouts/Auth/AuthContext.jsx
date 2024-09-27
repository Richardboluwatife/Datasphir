// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// AuthProvider component
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize dark mode state from localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }

    // Apply the dark mode class based on state
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(
        "https://datasphir-blog-app.onrender.com/auth/users/me/",
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
    } finally {
      setLoading(false); // Set loading to false after fetch is complete
    }
  };

  const login = async (email, password) => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const response = await fetch(
        "https://datasphir-blog-app.onrender.com/auth/jwt/create/",
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
        const errorData = await response.json();
        setError(errorData.detail || "Login failed."); // Set error message
        console.error("Login failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again."); // Set error message
    } finally {
      setLoading(false); // End loading
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

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        loading,
        error,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
