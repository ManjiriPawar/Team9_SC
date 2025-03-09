"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./wallet-animation.css";
import { Wallet, CreditCard, Coins } from "lucide-react";

const WalletAnimation = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const targetAmount = 15000;
  const counterRef = useRef(null);

  const toggleWallet = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setCount(0);
    }
  };

  useEffect(() => {
    if (isOpen && count < targetAmount) {
      const timer = setTimeout(() => {
        const increment = Math.ceil((targetAmount - count) / 20);
        setCount((prev) => Math.min(prev + increment, targetAmount));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen, count]);

  // Handle close button click
  const handleClose = () => {
    navigate("/dashboard"); // Navigate to the dashboard
  };

  return (
    <div className="wallet-container">
      <div className="wallet-section">
        <div
          className={`wallet ${isOpen ? "open" : ""}`}
          onClick={toggleWallet}
        >
          <div className="wallet-front">
            <Wallet className="wallet-icon" size={40} />
            <div className="wallet-label">My Savings</div>
          </div>
          <div className="wallet-inside">
            <div className="wallet-content">
              <CreditCard className="card-icon" size={24} />
              <div className="amount-container">
                <Coins className="coins-icon" size={20} />
                <div className="amount" ref={counterRef}>
                  ₹{count.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="wallet-info">Total Savings</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`woman-character ${isOpen ? "visible" : ""}`}>
        <img
          src="https://www.diedit.com/wp-content/uploads/2016/07/irit-pengeluaran.jpg"
          alt="Woman with savings"
          className="woman-image"
          width="500"
        />
        <div className="speech-bubble">
          {isOpen && count >= targetAmount
            ? "I saved ₹15,000!"
            : "Click the wallet!"}
        </div>
      </div>

      {/* Close Button */}
      <button className="close-btn" onClick={handleClose}>
        ✖
      </button>
    </div>
  );
};

export default WalletAnimation;