import React, { useState } from "react";
import { auth } from "../firebase"; // Import Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import SavingsJar from "../animation/saving-jar";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Welcome, financial boss ! 🎉\nYour dreams deserve every penny saved ! 💖");
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  
  return (
    <AuthLayout>
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
    </AuthLayout>
  );
};

export default Login;



