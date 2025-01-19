import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/toasts/ToastManager"
import { login } from "../slices/userSlice";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();
  const navigate = useNavigate();

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
        localStorage.setItem("userIdToLogin", response.session.userId)
        localStorage.setItem("token", response.session.userId)
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
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <div className="bg-secondary p-8 rounded-lg shadow-lg text-center w-[500px]"> {/* Increased width */}
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
            <button
              type="submit"
              className="w-full bg-accent text-primary py-3 rounded-md font-semibold hover:bg-highlight transition"
            >
               {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Login"
                )}
            </button>
          </form>
  
          <div className="mt-4">
            <a
              href="#"
              className="text-highlight hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    );
  }
  