import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/toasts/ToastManager";
import { login } from "../slices/userSlice";
import Button from "../components/reusable/Button";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);

  const validateInputs = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Please enter a valid email address";
      }
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(email, password);
      if (response.status === 200) {
        setIsLoading(false);
        localStorage.clear();
        localStorage.setItem("userIdToLogin", response.session.userId);
        localStorage.setItem("token", response.session.userId);
        addToast("success", response.message, 3000);
        navigate("/dashboard");
      } else {
        setIsLoading(false);
        addToast("error", response.message, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      addToast("error", error.message || "An unexpected error occurred.", 3000);
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPasswordVisible(!isForgotPasswordVisible);
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center">
      <div className="bg-secondary p-8 rounded-lg shadow-lg text-center w-[500px]">
        <h1 className="text-accent text-3xl font-bold mb-4">Wallet App</h1>
        <p className="text-dark mb-6">Welcome! Please log in to continue.</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>
         <Button title="Login" isLoading={isLoading}/>
        </form>

        <div className="mt-4">
          <button
            className="text-highlight hover:underline text-sm"
            onClick={toggleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {isForgotPasswordVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Forgot Password</h2>
            <p className="text-sm text-gray-700 mb-4">
              This option is not available at the moment as the app is being used by one user. 
              Please refer to the app documentation to understand how to use it. 
              For special cases, contact the product owner directly.
            </p>
            <button
              onClick={toggleForgotPassword}
              className="bg-highlight text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <footer className="text-gray-600 text-sm mt-6">
        &copy; 2025 AKIMANA. All rights reserved. partnered COA with DCCS
      </footer>
    </div>
  );
}
