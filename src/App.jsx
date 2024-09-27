// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout1 from "./layouts/header/nav_gen/RootLayout1";
import Login from "./layouts/Auth/Login";
import NotFound from "./routes/NotFound";
import AccountActivation from "./layouts/Auth/AccountActivation";
import PasswordReset from "./layouts/Auth/PasswordReset";
import ResetPassword from "./layouts/Auth/ResetPassword";
import Dashboard from "./Pages/Dashboard";
import Settings from "./Pages/Settings";
import { AuthProvider } from "./layouts/Auth/AuthContext";
import ProtectedRoute from "./layouts/Auth/ProtectedRoute";
import Post from "./Pages/Post";

function App() {
  const [uploadedImage, setUploadedImage] = useState(
    localStorage.getItem("uploadedImage") || "assets/profile_circle"
  );
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setUploadedImage(imageUrl);
        localStorage.setItem("uploadedImage", imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file selected");
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setIsDarkMode(savedTheme === "dark");
  }, []);

  return (
    <AuthProvider>
      <div className={`${isDarkMode ? "dark" : ""}`}>
        {/* Theme toggle button */}
        <button
          onClick={toggleDarkMode}
          className="fixed top-24 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RootLayout1 />}>
              <Route path="/login" element={<Login />} />
              <Route
                index
                element={
                  <div className="flex">
                    <div className="main-content flex-1 p-2">
                      <Dashboard />
                    </div>
                  </div>
                }
              />
              <Route
                path="auth/activate/:uid/:token"
                element={<AccountActivation />}
              />
              <Route
                path="password-reset/:uid/:token"
                element={<PasswordReset />}
              />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Protected Routes */}
            <Route path="/" element={<RootLayout1 />}>
              <Route
                path="settings"
                element={
                  <ProtectedRoute>
                    <div className="flex">
                      <div className="main-content flex-1 p-2">
                        <Settings
                          uploadedImage={uploadedImage}
                          handleImageUpload={handleImageUpload}
                          fileInputRef={fileInputRef}
                        />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="post"
                element={
                  <ProtectedRoute>
                    <div className="flex">
                      <div className="main-content flex-1 p-2">
                        <Post
                          uploadedImage={uploadedImage}
                          handleImageUpload={handleImageUpload}
                          fileInputRef={fileInputRef}
                        />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
