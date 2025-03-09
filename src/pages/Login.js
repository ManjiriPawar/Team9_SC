import React, { useState } from "react";
import { auth } from "../firebase"; // Import Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import SavingsJar from "../animation/saving-jar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="shevault-container">
      {/* Left Side: Login Form */}
      <div className="login-form">
        <div className="savings-jar-container">
          <SavingsJar />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600">Continue your financial journey with us</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Right Side: Image, App Name, and Tagline */}
      <div className="shevault-content">
        <div className="shevault-image">
        <img
            src="https://media.istockphoto.com/id/1335032831/vector/business-woman-watering-money-tree-female-employee-investing-and-saving-cash-money-deposit.jpg?s=612x612&w=0&k=20&c=wylOvpHuxoXUVB4rVb8_zp7kYsJ2DA4wZzISafsNpXo="
            alt="Women Financial Saving Tracker"
          />
        </div>
        <h1 className="shevault-title">SheVault</h1>
        <p className="shevault-tagline">
          Empowering Women to Save, Invest, and Grow
        </p>
      </div>
    </div>
  );
};

export default Login;