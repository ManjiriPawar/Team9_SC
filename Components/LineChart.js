import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ chartData }) => {
  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Expenditure', // Set your chart title here
      },
      // Tooltip configuration
      tooltip: {
        enabled: true, // Enable tooltips
        animation: false, // Disable tooltip animation entirely
        intersect: false, // Show tooltip even if the cursor is not directly over the point
        mode: 'index', // Show tooltips for all items at the same index
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ₹${value}`; // Customize the tooltip label
          },
        },
      },
    },
    // Animation configuration
    animation: {
      duration: 300, // Faster animation
      easing: 'easeOutQuart', // Smooth easing function
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '  Amount spent', // Set your Y-axis title here
        },
      },
      x: {
        title: {
          display: true,
          text: '   Date', // Set your X-axis title here
        },
      },
    },
  };

  return (
    <div>
      <h3>Weekly Analysis</h3>
      <Line data={chartData} options={options} /> {/* Pass options here */}
    </div>
  );
};

export default LineChart;