// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        "https://rent-management-service.onrender.com/auth/users/reset_password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Error:", data);
        setErrorMessage(
          data.email ? data.email[0] : "An error occurred. Please try again."
        );
      } else {
        setSuccessMessage(
          "If this email is registered, you will receive an email."
        );
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="font-sans text-lg block text-center h-[89vh]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen xs:pt-20 sm:pt-52 md:pt-0">
        <p className="flex text-2xl xs:pt-6 pt-10 items-center md:pt-0 mb-8 xs:text-2xl">
          Enter your Email to reset your password
        </p>
        <div className="w-full shadow-xl items-center bg-gray-100 rounded-lg p-4 dark:border md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="sm:text-lg text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:outline-none focus:ring-2  focus:ring-gray-700"
                  placeholder="p*****************g@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="py-2 px-[10vh] xl:text-lg text-sm rounded-md bg-orange-500 hover:shadow-blue-500 shadow-md hover:bg-blue-500 hover:transition ease-out duration-300 text-white lg:px-20"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
            {errorMessage && (
              <p className="text-red-500 bg-gray-100 mt-4">{errorMessage}</p>
            )}
            {successMessage && (
              <div className="text-green-500 shadow-xl rounded-xl xs:text-sm bg-gray-100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center p-16 sm:p-16 md:p-20 lg:p-20 w-4/5 max-w-lg mx-auto">
                {/* text-green-500 shadow-xl rounded-xl bg-gray-100 fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-12 lg:p-16 xl:p-24 w-4/5 max-w-lg mx-auto */}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-20 h-20 mb-4"
                >
                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                </svg>
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
