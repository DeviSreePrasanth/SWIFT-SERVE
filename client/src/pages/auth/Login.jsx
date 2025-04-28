import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const [signupRole, setSignupRole] = useState("customer");

  const togglePanel = () => {
    setIsSignInActive((prev) => !prev);
    setLoginEmail("");
    setLoginPassword("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupRole("customer");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Basic input validation
    if (isSignInActive) {
      const trimmedEmail = loginEmail.trim();
      if (!trimmedEmail || !loginPassword) {
        toast.error("Please fill all fields.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        toast.error("Please enter a valid email.");
        return;
      }
    } else {
      const trimmedEmail = signupEmail.trim();
      if (!signupName || !trimmedEmail || !signupPassword || !signupRole) {
        toast.error("Please fill all fields, including role.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        toast.error("Please enter a valid email.");
        return;
      }
      if (signupPassword.length < 5) {
        toast.error("Password must be at least 5 characters.");
        return;
      }
    }

    setIsSubmitting(true);
    const toastId = toast.loading(
      isSignInActive ? "Logging in..." : "Signing up..."
    );
    const endpoint = isSignInActive ? "/api/auth/login" : "/api/auth/signup";
    const userData = isSignInActive
      ? { email: loginEmail.trim(), password: loginPassword }
      : {
          name: signupName.trim(),
          email: signupEmail.trim(),
          password: signupPassword,
          role: signupRole,
        };

    try {
      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        userData
      );

      if (isSignInActive) {
        // Login
        if (response.status === 200 && response.data.token) {
          const { user, token } = response.data;
          toast.update(toastId, {
            render: `Login successful! Welcome, ${user.role}.`,
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });

          // Store token and user info in localStorage
          console.log("Storing token:", token);
          localStorage.setItem("authToken", token);
          localStorage.setItem("userRole", user.role);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("userName", user.name);
          localStorage.setItem(
            "profileCompleted",
            user.profileCompleted.toString()
          );

          // Verify localStorage
          console.log("localStorage after set:", {
            authToken: localStorage.getItem("authToken"),
            userRole: localStorage.getItem("userRole"),
            userId: localStorage.getItem("userId"),
          });

          // Log navigation details
          console.log("Navigating to:", {
            role: user.role,
            profileCompleted: user.profileCompleted,
            destination:
              user.role === "vendor" && !user.profileCompleted
                ? "/extra-details"
                : user.role === "vendor" &&
                  user.profileCompleted &&
                  user.isApproved
                ? "/vendor-dashboard" // Navigate to vendor dashboard if approved
                : user.role === "vendor" &&
                  user.profileCompleted &&
                  !user.isApproved
                ? "/approval-waiting" // Navigate to approval waiting page if not approved
                : user.role === "admin"
                ? "/admin-dashboard"
                : "/home",
          });

          // Navigate based on role and profile completion
          setTimeout(() => {
            if (user.role === "vendor" && !user.profileCompleted) {
              navigate("/extra-details");
            } else if (user.role === "vendor" && user.profileCompleted && user.isApproved) {
              navigate("/vendor-dashboard");  // Navigate to vendor dashboard if approved
            } else if (user.role === "vendor" && user.profileCompleted && !user.isApproved) {
              navigate("/approval-waiting");  // Navigate to approval waiting if not approved
            } else if (user.role === "admin") {
              navigate("/admin-dashboard");
            } else {
              navigate("/home");
            }
          }, 1500);
          
        } else {
          toast.update(toastId, {
            render: response.data.message || "Login failed",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } else {
        // Signup
        if (response.status === 201) {
          toast.update(toastId, {
            render: "Signup successful! Please log in.",
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });
          setTimeout(() => {
            togglePanel();
          }, 1500);
        } else {
          toast.update(toastId, {
            render: response.data.message || "Signup failed",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Auth error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      const message =
        error.response?.data?.message ||
        "Error: Unable to connect to the server.";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="relative w-[768px] h-[480px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="absolute top-0 w-full h-full flex">
          <div
            className={`w-1/2 flex flex-col justify-center items-center bg-white px-8 transition-all duration-700 ${
              isSignInActive
                ? "opacity-100 z-10 translate-x-0"
                : "opacity-0 z-0 translate-x-[100%]"
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
                disabled={isSubmitting}
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
              <p className="text-sm text-blue-500 cursor-pointer mb-4">
                Forgot Your Password?
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-red-500 text-white px-6 py-2 rounded-md shadow-md ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-600"
                }`}
              >
                {isSubmitting ? "Logging in..." : "LOG IN"}
              </button>
            </form>
          </div>

          <div
            className={`w-1/2 flex flex-col justify-center items-center bg-white px-8 transition-all duration-700 ${
              !isSignInActive
                ? "opacity-100 z-10 translate-x-0"
                : "opacity-0 z-0 translate-x-[-100%]"
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
                disabled={isSubmitting}
                autoComplete="name"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                disabled={isSubmitting}
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="new-password"
              />
              <select
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
              </select>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-red-500 text-white px-6 py-2 rounded-md shadow-md ${
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
              disabled={isSubmitting}
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
