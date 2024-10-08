// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AccountActivation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isActivating, setIsActivating] = useState(true);
  const [activationMessage, setActivationMessage] = useState("");

  // Extract uid and token from the URL path
  const pathParts = location.pathname.split("/"); // Split the URL by '/'
  const uid = pathParts[3]; // Get the UID from the path
  const token = pathParts[4]; // Get the token from the path

  useEffect(() => {
    const activateAccount = async () => {
      if (!uid || !token) {
        setActivationMessage("Invalid activation link. Please try again.");
        setIsActivating(false);
        return;
      }

      try {
        // Send a POST request to activate the account
        await axios.post(
          "https://datasphir-blog-app.onrender.com/auth/users/activation/",
          { uid, token }
        );

        // Simulate progress
        let progressInterval = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress === 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return Math.min(oldProgress + 10, 100);
          });
        }, 100);

        // After the progress completes
        setTimeout(async () => {
          clearInterval(progressInterval); // Clear interval when done
          setIsActivating(false);

          setActivationMessage("Account activated successfully!");

          // Navigate to home route after activation
          navigate("/");
        }, 2000); // Adjust delay as needed
      } catch (error) {
        setIsActivating(false);
        console.error("Error activating account:", error.response?.data);
        setActivationMessage(
          "Failed to activate account. Please try again later."
        );
      }
    };

    activateAccount(); // Call the activation function
  }, [uid, token, navigate]); // Run when uid, token, or navigate changes

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-800 text-black dark:text-white p-2 pt-16">
      <h1 className="text-2xl font-bold mb-4">
        {isActivating ? "Activating your account..." : "Activation Complete"}
      </h1>
      <div className="w-40 h-40 mb-4">
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            pathColor: isActivating ? "#3b82f6" : "#22c55e",
            textColor: "#111827",
          })}
        />
      </div>
      {activationMessage && (
        <p className="text-lg text-center">{activationMessage}</p>
      )}
    </div>
  );
};

export default AccountActivation;
