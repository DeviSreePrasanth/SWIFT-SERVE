import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSignInActive, setIsSignInActive] = useState(true);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // State for alert messages
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const togglePanel = () => {
    setIsSignInActive((prev) => !prev);
    setAlertMessage("");
    setShowAlert(false);
    // Reset form fields
    setLoginEmail("");
    setLoginPassword("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userData = {};

    if (isSignInActive) {
      if (!loginEmail || !loginPassword) {
        setAlertMessage("Please fill all fields.");
        setAlertType("error");
        setShowAlert(true);
        return;
      }
      userData = {
        email: loginEmail,
        password: loginPassword,
        type: "login",
      };
    } else {
      if (!signupName || !signupEmail || !signupPassword) {
        setAlertMessage("Please fill all fields.");
        setAlertType("error");
        setShowAlert(true);
        return;
      }
      userData = {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        type: "signup",
      };
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth", userData);

      if (isSignInActive) {
        // Login
        if (response.status === 200 && response.data.token) {
          setAlertMessage("Login successful!");
          setAlertType("success");
          setShowAlert(true);
          localStorage.setItem("authToken", response.data.token);
          setTimeout(() => navigate("/home"), 1500);
        } else {
          setAlertMessage(response.data.message || "Incorrect username or password");
          setAlertType("error");
          setShowAlert(true);
        }
      } else {
        // Signup
        if (response.status === 200) {
          setAlertMessage("Signup successful! Please log in.");
          setAlertType("success");
          setShowAlert(true);
          setTimeout(() => {
            togglePanel(); // Switch to login panel
            setShowAlert(false);
          }, 1500);
        } else {
          setAlertMessage(response.data.message || "Signup failed");
          setAlertType("error");
          setShowAlert(true);
        }
      }
    } catch (error) {
      setAlertMessage("Error: Unable to connect to the server.");
      setAlertType("error");
      setShowAlert(true);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="relative w-[768px] h-[480px] bg-white rounded-lg shadow-lg overflow-hidden">
        {showAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className={`text-lg font-semibold ${alertType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {alertMessage}
              </p>
              <button
                onClick={() => setShowAlert(false)}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="absolute top-0 w-full h-full flex">
          <div
            className={`w-1/2 flex flex-col justify-center items-center bg-white px-8 transition-all duration-700 ${isSignInActive ? "opacity-100 z-10 translate-x-0" : "opacity-0 z-0 translate-x-[100%]"}`}
          >
            <h2 className="text-3xl font-bold mb-4">Log in</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <p className="text-sm text-blue-500 cursor-pointer mb-4">Forgot Your Password?</p>
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600"
              >
                LOG IN
              </button>
            </form>
          </div>

          <div
            className={`w-1/2 flex flex-col justify-center items-center bg-white px-8 transition-all duration-700 ${!isSignInActive ? "opacity-100 z-10 translate-x-0" : "opacity-0 z-0 translate-x-[-100%]"}`}
          >
            <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>

        <div
          className={`absolute top-0 w-1/2 h-full flex items-center justify-center bg-gradient-to-r from-red-400 to-orange-500 transition-transform duration-700 ${isSignInActive ? "translate-x-[100%]" : "-translate-x-0"}`}
        >
          <div className="text-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">
              {isSignInActive ? "Welcome Back!" : "Hello, Friend!"}
            </h2>
            <p className="mb-6">
              {isSignInActive
                ? "To keep connected with us, please login with your personal info."
                : "Enter your details and start the journey with us."}
            </p>
            <button
              onClick={togglePanel}
              className="border-2 border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-red-500"
            >
              {isSignInActive ? "SIGN UP" : "LOG IN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;