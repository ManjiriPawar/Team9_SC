import React from "react";
import { User } from "lucide-react"; // Import a woman icon
import "./ProgressBar.css"; // Add styles for the flag and woman icon

const ProgressBar = ({ savingsAmount, goalAmount }) => {
  const progress = (savingsAmount / goalAmount) * 100; // Calculate progress percentage

  // Define zones and their corresponding colors
  const zones = [
    { limit: 33, color: "#FF0000" }, // Red for 0-33%
    { limit: 66, color: "#FFA500" }, // Yellow for 33-66%
    { limit: 100, color: "#4CAF50" }, // Green for 66-100%
  ];

  // Determine the current zone color
  const currentZone = zones.find((zone) => progress <= zone.limit);
  const fillColor = currentZone ? currentZone.color : "#4CAF50"; // Default to green

  return (
    <div className="progress-bar-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        {/* Zones */}
        <div className="progress-bar-zones">
          {zones.map((zone, index) => (
            <div
              key={index}
              className="progress-bar-zone"
              style={{
                width: `${zone.limit - (index > 0 ? zones[index - 1].limit : 0)}%`,
                backgroundColor: zone.color,
              }}
            ></div>
          ))}
        </div>
        {/* Progress Bar Fill */}
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%`, backgroundColor: fillColor }}
        ></div>
      </div>

      {/* Flag at the End of the Progress Bar */}
      <div className="progress-bar-flag">
        <div className="flag-icon">🚩</div> {/* Flag emoji or custom icon */}
        <div className="flag-text">Goal</div> {/* "Goal" text */}
      </div>

      {/* Woman Icon at Current Progress */}
      <div
        className="progress-bar-woman"
        style={{ left: `${progress}%` }} // Position the woman icon at the current progress
      >
        <User size={20} color="#FF69B4" /> {/* Woman icon */}
      </div>
    </div>
  );
};

export default ProgressBar;