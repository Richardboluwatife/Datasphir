// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SessionExpiredModal from "./SessionExpiredModal"; // Import the modal component

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set loading state based on currentUser
    if (currentUser === null) {
      // Only redirect to login if currentUser is null and not loading
      setLoading(false);
    } else if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  const handleLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  if (loading) {
    // Show a loading state while checking the authentication status
    return (
      <div className="flex justify-center items-center h-[607px] ">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (currentUser) {
    // If the user is logged in, render the children components (e.g., the dashboard)
    return children;
  } else {
    // If the user is not logged in, show the session expired modal
    return <SessionExpiredModal onLogin={handleLogin} />;
  }
};

export default ProtectedRoute;
