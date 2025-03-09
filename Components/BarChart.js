import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  // Define specific colors for each category
  const categoryColors = {
    Food: "rgba(255, 99, 132, 0.6)", // Red
    Shopping: "rgba(30, 224, 85, 0.6)", // Green
    Travel: "rgba(255, 206, 86, 0.6)", // Yellow
    Miscellaneous: "rgba(75, 192, 192, 0.6)", // Teal
  };

  // Map the colors to the dataset based on the labels
  const backgroundColors = data.labels.map((label) => categoryColors[label] || "rgba(0, 0, 0, 0.6)"); // Fallback color

  // Update the datasets with the specific colors
  const updatedData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: backgroundColors,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Money Spent by Category",
      },
      // Tooltip configuration
      tooltip: {
        enabled: true, // Enable tooltips
        animation: false, // Disable tooltip animation entirely
        intersect: false, // Show tooltip even if the cursor is not directly over the bar
        mode: "index", // Show tooltips for all items at the same index
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            return `${label}: ₹${value}`; // Customize the tooltip label
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Categories",
        },
      },
    },
    // Animation configuration
    animation: {
      duration: 300, // Adjust the duration (in milliseconds) to control the speed
      easing: "easeOutQuart", // Smooth easing function
    },
  };

  return <Bar data={updatedData} options={options} />;
};

export default BarChart;