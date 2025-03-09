import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";
import FutureYou from "./pages/FutureYou";
import Wallet from "./pages/wallet-animation";
import Rewards from "./pages/rewards";
import WomenForWomen from "./pages/WomenForWomen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pages/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/future-you" element={<FutureYou />} />
      <Route path="/pages/wallet-animation" element={<Wallet />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/women-for-women" element={<WomenForWomen />} />
    </Routes>
  );
}

export default App;