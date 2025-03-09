import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Trophy, Users, Flame, Coins, UserCircle, LayoutDashboard } from "lucide-react";
import "./Dashboard.css";
import LineChart from "../Components/LineChart";
import ProgressBar from "../Components/ProgressBar";
import BarChart from "../Components/BarChart";
import Chatbot from "./Chatbot";
import WalletAnimation from "../pages/wallet-animation";

function Dashboard() {
  const navigate = useNavigate();
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logout button clicked"); // Debugging
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  // State for transactions and line chart data
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Money Spent Over Time",
        data: [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  });

  // State for monthly/annual view
  const [view, setView] = useState("monthly"); // "monthly" or "annually"
  const [monthlyChartData, setMonthlyChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [yearlyChartData, setYearlyChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // Function to toggle between monthly and annual views
  const handleViewToggle = (viewType) => {
    setView(viewType);
    if (viewType === "monthly") {
      fetchMonthlyData(currentMonth);
    } else {
      fetchYearlyData();
    }
  };

  // Function to fetch monthly data
  const fetchMonthlyData = async (month) => {
    const startDate = new Date(new Date().getFullYear(), month, 1);
    const endDate = new Date(new Date().getFullYear(), month + 1, 0);

    console.log("Fetching data for:", startDate, "to", endDate); // Log the date range

    const q = query(
      collection(db, "transactions"),
      where("date", ">=", startDate),
      where("date", "<=", endDate)
    );

    const querySnapshot = await getDocs(q);
    const transactionsData = querySnapshot.docs.map((doc) => doc.data());

    console.log("Fetched transactions:", transactionsData); // Log the fetched data

    const categories = {};
    transactionsData.forEach((transaction) => {
      const category = transaction.categoryType || "Uncategorized"; // Fallback for missing category
      const amount = parseFloat(transaction.amount) || 0; // Fallback for missing amount

      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category] += amount;
    });

    console.log("Processed categories:", categories); // Log the processed categories

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    setMonthlyChartData({
      labels,
      datasets: [
        {
          label: "Money Spent by Category",
          data,
          backgroundColor: "rgba(75,192,192,0.6)",
        },
      ],
    });
  };

  // Function to fetch yearly data
  const fetchYearlyData = async () => {
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date(new Date().getFullYear(), 11, 31);

    console.log("Fetching data for:", startDate, "to", endDate); // Log the date range

    const q = query(
      collection(db, "transactions"),
      where("date", ">=", startDate),
      where("date", "<=", endDate)
    );

    const querySnapshot = await getDocs(q);
    const transactionsData = querySnapshot.docs.map((doc) => doc.data());

    console.log("Fetched transactions:", transactionsData); // Log the fetched data

    const categories = {};
    transactionsData.forEach((transaction) => {
      const category = transaction.categoryType || "Uncategorized"; // Fallback for missing category
      const amount = parseFloat(transaction.amount) || 0; // Fallback for missing amount

      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category] += amount;
    });

    console.log("Processed categories:", categories); // Log the processed categories

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    setYearlyChartData({
      labels,
      datasets: [
        {
          label: "Money Spent by Category",
          data,
          backgroundColor: "rgba(75,192,192,0.6)",
        },
      ],
    });
  };

  // Function to handle month change
  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    if (newMonth < 0) newMonth = 11;
    if (newMonth > 11) newMonth = 0;
    setCurrentMonth(newMonth);
    fetchMonthlyData(newMonth);
  };

  // Fetch initial data
  useEffect(() => {
    fetchMonthlyData(currentMonth);
    fetchYearlyData();
  }, [currentMonth]); // Add currentMonth to the dependency array

  // Example savings and goal amounts
  const savingsAmount = 1500; // Example savings amount
  const goalAmount = 5000; // Example goal amount

  // Calculate the dates for the past 7 days (including today)
  const getPast7Days = () => {
    const today = new Date();
    const past7Days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      past7Days.push(date.toLocaleDateString("en-US"));
    }

    return past7Days;
  };

  const past7Days = getPast7Days();

  // Function to fetch transactions from Firestore
  useEffect(() => {
    const fetchTransactions = async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6); // 7 days ago (including today)
      const q = query(collection(db, "transactions"), where("date", ">=", startDate));
      const querySnapshot = await getDocs(q);
      const transactionsData = querySnapshot.docs.map((doc) => doc.data());
      setTransactions(transactionsData);
    };
    fetchTransactions();
  }, []);

  // Process the fetched transactions data into chart data
  useEffect(() => {
    const processedChartData = {
      labels: past7Days,
      datasets: [
        {
          label: "Money Spent Over Time",
          data: new Array(7).fill(0),
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
        },
      ],
    };

    transactions.forEach((transaction) => {
      const timestamp = transaction.date;
      const amount = parseFloat(transaction.amount);
      const date = timestamp ? new Date(timestamp.seconds * 1000) : new Date();
      const formattedDate = date.toLocaleDateString("en-US");

      if (past7Days.includes(formattedDate)) {
        const index = past7Days.indexOf(formattedDate);
        processedChartData.datasets[0].data[index] += amount;
      }
    });

    setChartData(processedChartData);
  }, [transactions, past7Days]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="nav flex-column">
          <button className="sidebar-link" onClick={() => navigate("/future-you")}>
            <LayoutDashboard size={20} />
            Future You
          </button>
          <button className="sidebar-link" onClick={() => navigate("/pages/wallet-animation")}>
            <Coins size={20} />
            Wallet
          </button>
          <button className="sidebar-link" onClick={() => navigate("/pages/rewards")}>
            <Trophy size={20} />
            Rewards
          </button>
          <button className="sidebar-link" onClick={() => navigate("/women-for-women")}>
            <Users size={20} />
            Women for Women
          </button>
        </div>
        <button className="sidebar-link logout-button" onClick={handleLogout} disabled={false}>Logout</button>
      </div>
      {isWalletOpen && (
        <div className="wallet-overlay">
          <div className="wallet-content">
            <WalletAnimation onClose={() => setIsWalletOpen(false)} />
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="top-navbar">
        <div className="navbar-brand">
          <img
            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=50&h=50&fit=crop"
            alt="Logo"
            className="me-2"
            style={{ width: "40px", height: "40px", borderRadius: "8px" }}
          />
          <span>Dashboard</span>
        </div>
        <div className="user-stats">
          <div className="stat-item">
            <Flame size={20} color="#e74c3c" />
            <span>15 Days</span>
          </div>
          <div className="stat-item">
            <Coins size={20} color="#f1c40f" />
            <span>2,500</span>
          </div>
          <div className="profile-icon" onClick={() => navigate("/pages/profile")}>
            <UserCircle size={24} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container-fluid">
          <h2 className="mb-4">Hey Budget Queen, Welcome back !!</h2>

          {/* Progress Bar */}
          <div className="mb-4">
            <ProgressBar savingsAmount={savingsAmount} goalAmount={goalAmount} />
          </div>

          {/* Line Chart */}
          <div className="chart-container">
            <LineChart chartData={chartData} />
          </div>

          {/* Monthly/Annual Buttons */}
          <div className="chart-buttons">
            <button
              className={`btn ${view === "monthly" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => handleViewToggle("monthly")}
            >
              Monthly Analysis
            </button>
            <button
              className={`btn ${view === "annually" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => handleViewToggle("annually")}
            >
              Annual Analysis
            </button>
          </div>

          {/* Bar Chart and Month Navigation */}
          {view === "monthly" && (
            <div className="bar-chart-container">
              <BarChart data={monthlyChartData} />
              <div className="month-navigation">
                <button className="btn btn-light month-nav-button" onClick={() => handleMonthChange(-1)}>
                  &lt;
                </button>
                <span className="mx-3">
                  {new Date(new Date().getFullYear(), currentMonth).toLocaleString("default", {
                    month: "long",
                  })}
                </span>
                <button className="btn btn-light " onClick={() => handleMonthChange(1)}>
                  &gt;
                </button>
              </div>
            </div>
          )}

          {/* Annual Bar Chart */}
          {view === "annually" && (
            <div className="bar-chart-container">
              <BarChart data={yearlyChartData} />
            </div>
          )}
        </div>
        <Chatbot />
      </main>
    </div>
  );
}

export default Dashboard;