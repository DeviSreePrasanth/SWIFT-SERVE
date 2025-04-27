import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSignInActive, setIsSignInActive] = useState(true);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loginMessageType, setLoginMessageType] = useState("");

  // Signup form states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("customer");
  const [signupMessage, setSignupMessage] = useState("");
  const [signupMessageType, setSignupMessageType] = useState("");

  const togglePanel = () => {
    setIsSignInActive((prev) => !prev);
    setLoginMessage("");
    setLoginMessageType("");
    setSignupMessage("");
    setSignupMessageType("");
    // Reset form fields
    setLoginEmail("");
    setLoginPassword("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupRole("customer");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (isSignInActive) {
      if (!loginEmail || !loginPassword) {
        setLoginMessage("Please fill all fields.");
        setLoginMessageType("error");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
        setLoginMessage("Please enter a valid email.");
        setLoginMessageType("error");
        return;
      }
    } else {
      if (!signupName || !signupEmail || !signupPassword || !signupRole) {
        setSignupMessage("Please fill all fields, including role.");
        setSignupMessageType("error");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) {
        setSignupMessage("Please enter a valid email.");
        setSignupMessageType("error");
        return;
      }
      if (signupPassword.length < 5) {
        setSignupMessage("Password must be at least 5 characters.");
        setSignupMessageType("error");
        return;
      }
    }

    const endpoint = isSignInActive ? "/api/auth/login" : "/api/auth/signup";
    const userData = isSignInActive
      ? { email: loginEmail, password: loginPassword }
      : { name: signupName, email: signupEmail, password: signupPassword, role: signupRole };

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, userData);

      if (isSignInActive) {
        // Login
        if (response.status === 200 && response.data.token) {
          const { user, token } = response.data;
          setLoginMessage(`Login successful! Welcome, ${user.role}.`);
          setLoginMessageType("success");

          // Store token and user info in localStorage
          localStorage.setItem("authToken", token);
          localStorage.setItem("userRole", user.role);
          localStorage.setItem("isApproved", user.isApproved.toString());
          localStorage.setItem("userId", user.id);
          localStorage.setItem("userName", user.name);
          localStorage.setItem("profileCompleted", user.profileCompleted.toString());

          // Redirect based on role, profile completion, and approval status
          setTimeout(() => {
            if (user.role === "vendor" && !user.profileCompleted) {
              navigate("/vendor-extra-details");
            } else if (user.role === "vendor" && !user.isApproved) {
              navigate("/approvalwaiting");
            } else if (user.role === "vendor" && user.isApproved) {
              navigate("/vendor-dashboard");
            } else if (user.role === "admin") {
              navigate("/admin-dashboard");
            } else {
              navigate("/home");
            }
          }, 1500);
        } else {
          setLoginMessage(response.data.message || "Incorrect email or password");
          setLoginMessageType("error");
        }
      } else {
        // Signup
        if (response.status === 201) {
          setSignupMessage("Signup successful! Please log in.");
          setSignupMessageType("success");
          setTimeout(() => {
            togglePanel();
          }, 1500);
        } else {
          setSignupMessage(response.data.message || "Signup failed");
          setSignupMessageType("error");
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || "Error: Unable to connect to the server.";
      if (isSignInActive) {
        setLoginMessage(message);
        setLoginMessageType("error");
      } else {
        setSignupMessage(message);
        setSignupMessageType("error");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="relative w-[768px] h-[480px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="absolute top-0 w-full h-full flex">
          <div
            className={`w-1/2 flex flex-col justify-center items-center bg-white px-8 transition-all duration-700 ${
              isSignInActive ? "opacity-100 z-10 translate-x-0" : "opacity-0 z-0 translate-x-[100%]"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4">Log In</h2>
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
              {loginMessage && (
                <p
                  className={`text-sm mb-4 ${
                    loginMessageType === "error" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {loginMessage}
                </p>
              )}
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600"
              >
                LOG IN
              </button>
            </form>
          </div>

          <div
            className={`w-1/2 flex flex-col justify-center items-center bg-white px-8 transition-all duration-700 ${
              !isSignInActive ? "opacity-100 z-10 translate-x-0" : "opacity-0 z-0 translate-x-[-100%]"
            }`}
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
              <select
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
              </select>
              {signupMessage && (
                <p
                  className={`text-sm mb-4 ${
                    signupMessageType === "error" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {signupMessage}
                </p>
              )}
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
          className={`absolute top-0 w-1/2 h-full flex items-center justify-center bg-gradient-to-r from-red-400 to-orange-500 transition-transform duration-700 ${
            isSignInActive ? "translate-x-[100%]" : "-translate-x-0"
          }`}
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