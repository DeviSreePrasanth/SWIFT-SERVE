import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [isSignInActive, setIsSignInActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const togglePanel = () => {
    setIsSignInActive((prev) => !prev);
    setLoginEmail("");
    setLoginPassword("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        `/auth/login`,
        {
          email: email.trim(),
          password: password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const { token, user } = response.data;
        console.log(`${user.name}`);
        console.log(`${user.email}`);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        return { success: true, message: `Login Successful` };
      } else {
        return {
          success: false,
          message: response.data.message || "Login failed",
        };
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const response = await axios.post(
        `/auth/signup`,
        {
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        message: "Signup successful! Please log in.",
      };
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      return {
        success: false,
        message:
          error.response?.data?.message || "Signup failed. Please try again.",
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Client-side validation
    if (isSignInActive) {
      if (!loginEmail.trim() || !loginPassword.trim()) {
        toast.error("Please fill all fields.");
        return;
      }
    } else {
      if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
        toast.error("Please fill all fields.");
        return;
      }
      if (signupPassword.trim().length < 5) {
        toast.error("Password must be at least 5 characters.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail.trim())) {
        toast.error("Please enter a valid email.");
        return;
      }
    }

    setIsSubmitting(true);
    const toastId = toast.loading(
      isSignInActive ? "Logging in..." : "Signing up..."
    );

    try {
      let result;
      if (isSignInActive) {
        result = await handleLogin(loginEmail, loginPassword);
      } else {
        result = await handleSignup(signupName, signupEmail, signupPassword);
      }

      if (result.success) {
        toast.update(toastId, {
          render: result.message,
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        if (isSignInActive) {
          setTimeout(() => navigate("/home"), 1500);
        } else {
          setTimeout(() => togglePanel(), 1500);
        }
      } else {
        toast.update(toastId, {
          render: result.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "An unexpected error occurred. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error("Auth error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="relative w-full max-w-3xl h-[480px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="absolute top-0 w-full h-full flex">
          {/* Login Panel */}
          <div
            className={`w-1/2 flex flex-col justify-center items-center bg-white px-8 transition-all duration-700 ${
              isSignInActive
                ? "opacity-100 z-10 translate-x-0"
                : "opacity-0 z-0 translate-x-full"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Log In</h2>
            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-100"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                disabled={isSubmitting}
                autoComplete="email"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-100"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="current-password"
                required
              />
              <p
                className="text-sm text-blue-500 cursor-pointer mb-4 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Your Password?
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-red-500 text-white px-6 py-2 rounded-md shadow-md transition ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-600"
                }`}
              >
                {isSubmitting ? "Logging in..." : "LOG IN"}
              </button>
            </form>
          </div>

          {/* Signup Panel */}
          <div
            className={`w-1/2 flex flex-col justify-center items-center bg-white px-8 transition-all duration-700 ${
              !isSignInActive
                ? "opacity-100 z-10 translate-x-0"
                : "opacity-0 z-0 -translate-x-full"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Sign Up</h2>
            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-100"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                disabled={isSubmitting}
                autoComplete="name"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-100"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                disabled={isSubmitting}
                autoComplete="email"
                required
              />
              <input
                type="password"
                placeholder="Password (min 5 characters)"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-100"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="new-password"
                minLength="5"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-red-500 text-white px-6 py-2 rounded-md shadow-md transition ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-600"
                }`}
              >
                {isSubmitting ? "Signing up..." : "SIGN UP"}
              </button>
            </form>
          </div>
        </div>

        {/* Overlay Panel */}
        <div
          className={`absolute top-0 w-1/2 h-full flex items-center justify-center bg-gradient-to-r from-red-400 to-orange-500 transition-transform duration-700 ${
            isSignInActive ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="text-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">
              {isSignInActive ? "New Here?" : "Welcome Back!"}
            </h2>
            <p className="mb-6">
              {isSignInActive
                ? "Sign up to discover great features!"
                : "Already have an account? Log in here."}
            </p>
            <button
              onClick={togglePanel}
              className="border-2 border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-red-500 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSignInActive ? "SIGN UP" : "LOG IN"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default Login;
