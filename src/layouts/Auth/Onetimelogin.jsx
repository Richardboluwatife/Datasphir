// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PasswordChecklist from "react-password-checklist";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the import path as needed
import Invalid from "./Invalid"; // Ensure the path to Invalid is correct
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars, react/prop-types
function Login({ setShowLogin }) {
  const { currentUser, login } = useAuth(); // Get currentUser and login function from AuthContext
  const [currState, setCurrState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false); // Keep signed-in state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    re_password: "", // Only used in Sign Up mode
    user_type: "Landlord", // Set user_type to "Landlord" by default for sign up
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false); // Track invalid login
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard"; // Default to dashboard if no previous location

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") ||
      sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn && currentUser) {
      navigate("/dashboard"); // Redirect to the dashboard if logged in
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser) {
      navigate(from); // If already logged in, redirect to the intended page or dashboard
    }
  }, [currentUser, navigate, from]);

  useEffect(() => {
    let timer;
    if (isProcessing && currState === "Sign Up") {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 5; // Adjust the increment as needed
          }
          clearInterval(timer);
          return 100;
        });
      }, 300); // Adjust the interval as needed
    }
    return () => clearInterval(timer);
  }, [isProcessing, currState]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setPasswordMismatch(false);
    setIsProcessing(true); // Start the progress bar for Sign Up

    // Ensure passwords match when signing up
    if (
      currState === "Sign Up" &&
      loginData.password !== loginData.re_password
    ) {
      setPasswordMismatch(true);
      setIsProcessing(false); // Stop the progress bar
      return;
    }

    // Set the appropriate URL based on the form state (Sign Up or Login)
    const url =
      currState === "Sign Up"
        ? "https://rent-management-service.onrender.com/auth/users/"
        : "https://rent-management-service.onrender.com/auth/jwt/create";

    // Prepare the data to be sent in the request
    const dataToSubmit =
      currState === "Sign Up"
        ? { ...loginData } // Include all fields for sign up
        : { email: loginData.email, password: loginData.password }; // Only email and password for login

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const contentType = response.headers.get("Content-Type");
      const data = await response.json();

      if (!response.ok) {
        console.error("Response status:", response.status);

        if (contentType && contentType.includes("application/json")) {
          console.error("Failed to submit user data:", data);

          if (
            data.email &&
            data.email[0] === "user with this email already exists."
          ) {
            window.alert("Email already exists. Please use a different email.");
          } else if (currState === "Login") {
            setIsInvalidLogin(true); // Show the Invalid component
          } else {
            window.alert("An error occurred. Please try again.");
          }
        } else {
          const errorText = await response.text();
          console.error(
            "Failed to submit user data. Response was not JSON:",
            errorText
          );
          window.alert("An error occurred. Please try again.");
        }
      } else {
        if (currState === "Sign Up") {
          setAccountCreated(true);
          setCurrState("Login"); // Change state to Login after successful signup
        } else {
          console.log("User data submitted successfully:", data);
          await login(loginData.email, loginData.password); // Call the login function from AuthContext
          // window.alert("Login successful.");

          if (keepSignedIn) {
            localStorage.setItem("isLoggedIn", true);
          } else {
            sessionStorage.setItem("isLoggedIn", true);
          }

          navigate(from, { replace: true }); // Redirect to the page they were trying to access or dashboard
        }
      }
    } catch (error) {
      console.error("Error while submitting user data:", error);
      window.alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false); // Stop the progress bar
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  if (accountCreated) {
    return (
      <div className="flex justify-center items-center h-[607px]">
        <h1 className="text-2xl font-bold">
          Account created successfully. Check your email to activate your
          account.
        </h1>
      </div>
    );
  }

  return (
    <div>
      {isInvalidLogin ? (
        <Invalid onLogin={() => setIsInvalidLogin(false)} />
      ) : isProcessing && currState === "Sign Up" ? (
        <div className="flex justify-center items-center h-[607px]">
          <div className="w-40 h-40">
            <CircularProgressbar
              value={progress}
              text={progress === 100 ? "✔" : `${progress}%`}
              styles={buildStyles({
                pathColor: progress < 100 ? "#3b82f6" : "#22c55e",
                textColor: "#111827",
                textSize: "30px", // Increase the text size for the ✔ symbol
                fontWeight: "bold", // Make the checkmark bold
              })}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="md:flex gap-32 pt-20 justify-center pb-10">
            <div>
              <div>
                <h1 className="text-4xl xs:text-center text-center">
                  {currState === "Sign Up" ? "Create your account" : "Login"}
                </h1>
                <h3 className="text-xl text-orange-600 md:pl-6 xs:text-center text-center">
                  Happy User, Happy Blog
                </h3>
              </div>

              <div className="pt-10 xs:hidden md:block">
                <img className="w-[400px]" src={assets.Logo} alt="" />
              </div>
            </div>

            <div className="border-l-2 border-blue-500"></div>

            <div>
              <form
                className="flex flex-col w-full md:w-[400px] justify-center xs:px-5"
                onSubmit={handleFormSubmit}
              >
                <label className="text-2xl">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-14"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />
                <br />

                <label className="text-2xl">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-14"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                  {showPassword ? (
                    <AiFillEyeInvisible
                      className="absolute top-4 right-3 cursor-pointer"
                      size={20}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute top-4 right-3 cursor-pointer"
                      size={20}
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>

                <br />

                {currState === "Sign Up" && (
                  <>
                    <label className="text-2xl">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        name="re_password"
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-14"
                        value={loginData.re_password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <br />

                    <PasswordChecklist
                      rules={[
                        "minLength",
                        "specialChar",
                        "number",
                        "capital",
                        "match",
                      ]}
                      minLength={8}
                      value={loginData.password}
                      valueAgain={loginData.re_password} // Add this line to check for password match
                      // eslint-disable-next-line no-unused-vars
                      onChange={(isValid) => {
                        // Optionally handle validation status
                      }}
                    />
                    {passwordMismatch && (
                      <p className="text-red-500">Passwords do not match!</p>
                    )}
                  </>
                )}

                {currState === "Sign Up" && (
                  <div className="flex items-center my-2 justify-between">
                    <div className="text-sm items-center flex mx-2 mt-3">
                      <input
                        type="checkbox"
                        name=""
                        id="checkbox"
                        className="cursor-pointer mr-1 w-5 h-5"
                        checked={keepSignedIn}
                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                      />
                      remember me
                    </div>
                  </div>
                )}

                {currState === "Login" && (
                  <div className="flex items-center my-2 justify-between">
                    <div className="text-sm items-center flex mx-2 mt-3">
                      <input
                        type="checkbox"
                        name="keepSignedIn"
                        id="checkbox"
                        className="cursor-pointer mr-1 w-5 h-5"
                        checked={keepSignedIn}
                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                      />
                      keep me signed in
                    </div>
                    <Link to="/reset-password">
                      <button className="text-[12px] text-right tracking-wide mx-2 underline pt-2 cursor-pointer text-blue-500 hover:text-blue-700">
                        forgot password?
                      </button>
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600"
                  disabled={isProcessing}
                >
                  {currState === "Sign Up" ? "Sign Up" : "Login"}
                </button>

                <div className="flex flex-col items-center justify-center text-center pt-4">
                  <p
                    className="cursor-pointer hover:underline"
                    onClick={() =>
                      setCurrState(
                        currState === "Sign Up" ? "Login" : "Sign Up"
                      )
                    }
                  >
                    {currState === "Sign Up"
                      ? "Already have an account? Log In"
                      : "Don't have an account? Sign Up"}
                  </p>
                </div>
                {currState === "Login" && (
                  <div className=" xs:pb-[120px]"></div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
