import React, { useState, useEffect } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MembershipForm = ({ uploadedImage, handleImageUpload, fileInputRef }) => {
  const handleUploadClick = () => {
    // eslint-disable-next-line react/prop-types
    fileInputRef.current.click();
  };

  const [currentStep, setCurrentStep] = useState(
    () => parseInt(localStorage.getItem("currentStep")) || 1
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const [personalDetails, setPersonalDetails] = useState({
    userType: "Landlord", // Automatically set to "Landlord"
    username: "",
    surname: "",
    firstName: "",
    otherName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    picture: null,
    picturePreview: null,
  });

  const [addressDetails, setAddressDetails] = useState({
    address1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [propertyDetails, setPropertyDetails] = useState({
    propertyName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    propertyType: "",
    numberOfApartments: "",
    availableFrom: "",
  });

  const steps = [1, 2, 3, 4];

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep);
  }, [currentStep]);

  const handlePersonalDetailsChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files) {
      const pictureFile = files[0];
      setPersonalDetails({
        ...personalDetails,
        picture: pictureFile,
        picturePreview: URL.createObjectURL(pictureFile),
      });
    } else {
      setPersonalDetails({
        ...personalDetails,
        [name]: value,
      });
    }
  };

  const handleAddressDetailsChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails({
      ...addressDetails,
      [name]: value,
    });
  };

  const handlePropertyDetailsChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({
      ...propertyDetails,
      [name]: value,
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    // Basic validation to ensure fields are not empty
    if (currentStep === 1 && !personalDetails.firstName) return;
    if (currentStep === 2 && !addressDetails.address1) return;
    if (currentStep === 3 && !propertyDetails.propertyName) return;

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log(personalDetails, addressDetails, propertyDetails);
    // Handle final form submission logic here

    // Show success message
    setFormSubmitted(true);

    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  const handleSkip = () => {
    setFormSubmitted(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen items-center justify-center bg-white px-24 pt-12">
      <div className="w-full p-8 bg-white shadow-md rounded-lg">
        <div className="flex items-center pb-5">
          <h2 className=" font-sans text-2xl font-semibold pl-5">
        <p className="font-sans text-[45px] text-orange-500 font-bold mb-4 text-center">WELCOME!</p>
            RentPadi Landlord Data Form
          </h2>
        </div>
        <p className="mb-4 font-sans pl-5">Please Fill in your information</p>

        <div className="justify-between mb-4 pl-5">
          <div className="flex gap-1">
            {currentStep > 1 && (
              <>
                <GoArrowLeft
                  className="mt-0.5 text-orange-500 w-5 h-5 cursor-pointer"
                  onClick={handlePreviousStep}
                />
                <button
                  type="button"
                  className="text-orange-500 pb-5"
                  onClick={handlePreviousStep}
                >
                  Back
                </button>
              </>
            )}
          </div>

          <div className="flex items-center ">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <span
                  className={`p-1 rounded-full border-2 border-solid ${
                    currentStep === step
                      ? "bg-gray-100 border-orange-500"
                      : "bg-transparent border-transparent"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full ${
                      currentStep >= step ? "bg-orange-500" : "bg-orange-500"
                    }`}
                  ></div>
                </span>
                {index !== steps.length - 1 && (
                  <p className="text-2xl text-orange-500 px-4">
                    ---------------------------------
                  </p>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {currentStep === 1 && (
          <form onSubmit={handleNextStep}>
            <div className="pb-5 pl-5">
              <h1 className=" text-2xl">Personal Details</h1>
            </div>
            <div className="flex justify-center items-center min-h-[550px] bg-gray-100 w-full ml-5">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[900px]">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-36 h-36 m-6 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                    <img
                      src={uploadedImage}
                      alt="Profile"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={handleUploadClick}
                    />
                  </div>
                  <button
                    className="border-none hover:bg-orange-400 transition ease-out duration-200 bg-orange-600 font-sans rounded-xl text-white px-10 py-2 mb-3"
                    onClick={handleUploadClick}
                  >
                    Upload
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>

                

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    value={personalDetails.firstName}
                    onChange={handlePersonalDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="First name"
                    required
                  />
                  <input
                    type="text"
                    name="otherName"
                    value={personalDetails.otherName}
                    onChange={handlePersonalDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="Middle name"
                  />
                  <input
                    type="text"
                    name="surname"
                    value={personalDetails.surname}
                    onChange={handlePersonalDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="Last name"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="username"
                    value={personalDetails.username}
                    onChange={handlePersonalDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="Username"
                  />
                  <input
                    type="text"
                    name="gender"
                    value={personalDetails.gender}
                    onChange={handlePersonalDetailsChange}
                    className="border font-sans border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Gender"
                  />
                  <div>
                    <p>Date of birth</p>
                    <input
                      type="date"
                      name="dob"
                      value={personalDetails.dob}
                      onChange={handlePersonalDetailsChange}
                      className="border font-sans border-gray-300 rounded-lg p-2 w-full h-8"
                      placeholder="Date of birth"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="email"
                    name="email"
                    value={personalDetails.email}
                    onChange={handlePersonalDetailsChange}
                    className="col-span-2 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={personalDetails.phone}
                    onChange={handlePersonalDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="Phone"
                  />
                </div>
                <div className="flex justify-center bg-blue-500 rounded-xl cursor-pointer">
                  <button
                    type="submit"
                    className="bg-blue-500 font-sans text-white px-6 py-2 rounded-lg w-full flex items-center justify-center gap-2 text-xl"
                  >
                    Continue
                    <GoArrowRight className="mt-0.5 text-white w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="flex justify-end pr-5 pb-5">
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-2 rounded-full"
                            >
                                <span>Next</span>
                                <GoArrowRight />
                            </button>
                        </div> */}
          </form>
        )}
        {currentStep === 2 && (
          <form onSubmit={handleNextStep}>
            <div className="pb-5 pl-16 flex gap-[850px]">
              <h1 className=" text-2xl">Address</h1>
              <button
                type="button"
                className="text-blue-500 underline text-xl"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
            <div className="flex justify-center items-center min-h-[300px] bg-gray-100 w-full ml-5">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[900px]">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="address1"
                    value={addressDetails.address1}
                    onChange={handleAddressDetailsChange}
                    className="col-span-3 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="Address"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    value={addressDetails.city}
                    onChange={handleAddressDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="state"
                    value={addressDetails.state}
                    onChange={handleAddressDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={addressDetails.postalCode}
                    onChange={handleAddressDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="Postal code"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    name="country"
                    value={addressDetails.country}
                    onChange={handleAddressDetailsChange}
                    className="border font-sans border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Country"
                  />
                </div>

                <div className="flex justify-center bg-blue-500 rounded-xl cursor-pointer">
                  <button
                    type="submit"
                    className="bg-blue-500 font-sans text-white px-6 py-2 rounded-lg w-full flex items-center justify-center gap-2 text-xl"
                  >
                    Continue
                    <GoArrowRight className="mt-0.5 text-white w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleNextStep}>
            <div className="pb-5 pl-16 flex gap-[780px]">
              <h1 className=" text-2xl">Property Details</h1>
              <button
                type="button"
                className="text-blue-500 underline text-xl"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
            <div className="flex justify-center items-center min-h-[400px] bg-gray-100 w-full ml-5">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[900px]">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="propertyName"
                    value={propertyDetails.propertyName}
                    onChange={handlePropertyDetailsChange}
                    className="col-span-3 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="Property Name"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    value={propertyDetails.address}
                    onChange={handlePropertyDetailsChange}
                    className="col-span-3 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    name="city"
                    value={propertyDetails.city}
                    onChange={handlePropertyDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="state"
                    value={propertyDetails.state}
                    onChange={handlePropertyDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="country"
                    value={propertyDetails.country}
                    onChange={handlePropertyDetailsChange}
                    className="col-span-1 font-sans border border-gray-300 rounded-lg p-2"
                    placeholder="Country"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="propertyType"
                    value={propertyDetails.propertyType}
                    onChange={handlePropertyDetailsChange}
                    className="border font-sans border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Property Type"
                  />
                  <input
                    type="number"
                    name="numberOfApartments"
                    value={propertyDetails.numberOfApartments}
                    onChange={handlePropertyDetailsChange}
                    className="border font-sans border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Number of Apartments"
                  />
                  <div>
                    <p className="font-sans">Available from</p>
                    <input
                      type="date"
                      name="availableFrom"
                      value={propertyDetails.availableFrom}
                      onChange={handlePropertyDetailsChange}
                      className="border font-sans border-gray-300 rounded-lg p-2 w-full h-8"
                      placeholder="Available from"
                    />
                  </div>
                </div>

                <div className="flex justify-center bg-blue-500 rounded-xl cursor-pointer">
                  <button
                    type="submit"
                    className="bg-blue-500 font-sans text-white px-6 py-2 rounded-lg w-full flex items-center justify-center gap-2 text-xl"
                  >
                    Continue
                    <GoArrowRight className="mt-0.5 text-white w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        <div>
          {!formSubmitted && currentStep === 4 && (
            <div className="pb-5 pl-5">
              <h1>Submit Form</h1>
              <div className="flex justify-center items-center min-h-[300px] bg-gray-100 w-full ml-5">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[900px]">
                  <p className="text-center mb-6">
                    You have successfully completed all steps.
                  </p>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="bg-green-500 text-white px-6 py-2 rounded-lg"
                      onClick={handleFinalSubmit}
                    >
                      Submit Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {formSubmitted && (
            <div className="flex flex-col items-center h-80 pt-20">
              <IoIosCheckmarkCircleOutline className="text-green-500 text-8xl" />
              <p className="text-2xl font-semibold text-green-500">
                successful
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
