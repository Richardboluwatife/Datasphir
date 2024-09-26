// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes } from "react-router-dom";

/* Public Routes */
import RootLayout from "./layouts/RootLayout";
import RootLayout1 from "./layouts/header/nav_gen/RootLayout1";
import Login from "./layouts/Auth/Login";
import NotFound from "./routes/NotFound";
// import Onetime from "./layouts/Auth/Onetimelogin"; // Consider removing if not needed
import AccountActivation from "./layouts/Auth/AccountActivation";
import PasswordReset from "./layouts/Auth/PasswordReset";
import ResetPassword from "./layouts/Auth/ResetPassword";

/* Protected Routes */
import Dashboard from "./Pages/Dashboard";
import Settings from "./Pages/Settings";

import { AuthProvider } from "./layouts/Auth/AuthContext";
import ProtectedRoute from "./layouts/Auth/ProtectedRoute"; // Ensure import is correct
import Post from "./Pages/Post";

function App() {
  const [uploadedImage, setUploadedImage] = React.useState(
    localStorage.getItem("uploadedImage") || "assets/profile_circle" // Placeholder image
  );

  const fileInputRef = React.useRef(null);

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
      // Handle invalid file selection (optional)
      console.error("Invalid file selected");
    }
  };

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Login />} />
          {/* <Route path="Login-Signup" element={<Onetime />} /> */}
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
            path="dashboard"
            element={
              // <ProtectedRoute>
                <div className="flex">
                  <div className="main-content flex-1 p-2">
                    <Dashboard />
                  </div>
                </div>
              // </ProtectedRoute>
            }
          />

          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <div className="flex">
                  <div className="main-content flex-1 p-2">
                    {/* Pass uploadedImage and handleImageUpload to Settings if needed */}
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
                    {/* Pass uploadedImage and handleImageUpload to Settings if needed */}
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
    </AuthProvider>
  );
}

export default App;
