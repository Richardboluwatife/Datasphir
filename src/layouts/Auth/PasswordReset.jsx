// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function PasswordReset() {
  const [formData, setFormData] = useState({
    newPassword: "",
    reNewPassword: "",
  });
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Extract UID and token from the URL path
    const pathSegments = window.location.pathname.split("/");
    const uidFromUrl = pathSegments[2]; // The UID is the segment after /password-reset/
    const tokenFromUrl = pathSegments[3]; // The token is the segment after the UID

    setUid(uidFromUrl);
    setToken(tokenFromUrl);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "newPassword") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must have at least one capital letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must have at least one number.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must have at least one special character.");
    }
    if (password.length < 8) {
      errors.push("Password must have at least 8 characters.");
    }
    setPasswordError(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.reNewPassword) {
      setError("Passwords don't match");
      return;
    }

    if (passwordError.length > 0) {
      return; // Prevent form submission if there are password validation errors
    }

    setError("");
    setIsSubmitting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
    }, 300);

    try {
      const response = await fetch(
        "https://datasphir-blog-app.onrender.com/auth/users/reset_password_confirm/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            token,
            new_password: formData.newPassword,
            re_new_password: formData.reNewPassword,
          }),
        }
      );

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.detail || "An error occurred");
        setIsSubmitting(false);
        return;
      }

      // Handle successful password reset
      setIsSubmitting(false);
      navigate("/"); // Redirect to login page after successful password reset
    } catch (error) {
      clearInterval(interval);
      setError("An error occurred. Please try again.");
      setProgress(0);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reset-password-form flex flex-col items-center justify-center min-h-screen">
      <span className="text-[20px] text-center my-5">
        Enter your new password
      </span>
      {isSubmitting ? (
        <div className="flex justify-center items-center h-[607px]">
          <div className="w-40 h-40">
            <CircularProgressbar
              value={progress}
              text={progress === 100 ? "✔" : `${progress}%`}
              styles={buildStyles({
                pathColor: progress < 100 ? "#3b82f6" : "#22c55e",
                textColor: "#111827",
                textSize: "30px",
                fontWeight: "bold",
              })}
            />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-full items-center shadow-xl bg-gray-100 border border-black rounded-lg p-6 md:p-8 lg:p-10 max-w-md mx-10">
            <div className="form-group relative mb-6">
              <label htmlFor="newPassword" className="block text-left mb-2">
                New password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                className="w-full px-3 py-2  rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 h-14"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute top-[62px] right-3 transform -translate-y-1/2 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEye
                  className="absolute top-[62px] right-3 transform -translate-y-1/2 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword(true)}
                />
              )}
              {passwordError.map((err, index) => (
                <p key={index} className="text-red-500 text-left mt-1">
                  {err}
                </p>
              ))}
            </div>
            <div className="form-group relative mb-6">
              <label htmlFor="reNewPassword" className="block text-left mb-2">
                Confirm password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="reNewPassword"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 h-14"
                placeholder="Confirm password"
                name="reNewPassword"
                value={formData.reNewPassword}
                onChange={handleChange}
                required
              />
              {error && <p className="text-red-500 text-left mt-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white hover:shadow-blue-500 shadow-md hover:bg-blue-500 hover:transition ease-out duration-300 w-full px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PasswordReset;
