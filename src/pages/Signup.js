// src/components/Signup.js
import React, { useState } from "react";
import { auth } from "../firebase"; // Import Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { validatePassword } from "../utils"; // Import the utility function

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Clear previous errors
    if (error) setError("");

    // Basic input validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Password complexity validation
    if (!validatePassword(password)) {
      setError(
        "Password must contain at least 6 characters, one capital letter, one small letter, one digit, and one special character."
      );
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful! 🎉");
      navigate("/dashboard"); // Redirect to dashboard after signup
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already in use.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak.");
          break;
        default:
          setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
        Create an Account
      </h1>
      <p className="text-gray-600">Start your financial journey with us</p>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div className="signup-links">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      {/* Bottom Error Message */}
      {error && (
        <div className="bottom-error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Signup;

