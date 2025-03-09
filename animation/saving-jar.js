import React from "react";

const SavingsJar = () => {
  const styles = {
    root: {
      backgroundColor: "transparent", // Remove background color
    },
    jarContainer: {
      position: "relative",
      width: "80px", // Reduced width
      height: "100px", // Reduced height\
      left: "110px",
      bottom: "20px",
    },
    jar: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    jarTop: {
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "50px", // Reduced width
      height: "12px", // Reduced height
      background: "#c8e6ff",
      border: "2px solid #94a4b8", // Thinner border
      borderRadius: "8px 8px 0 0", // Smaller border radius
      zIndex: 2,
    },
    jarBody: {
      position: "absolute",
      top: "10px", // Adjusted top position
      width: "100%",
      height: "calc(100% - 10px)", // Adjusted height
      background: "rgba(200, 230, 255, 0.5)",
      border: "2px solid #94a4b8", // Thinner border
      borderRadius: "10px", // Smaller border radius
      overflow: "hidden",
    },
    fillLevel: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "30%",
      background: "#fbbf24",
      animation: "fill 3s ease-in-out infinite alternate",
    },
    coins: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 1,
    },
    coin: {
      position: "absolute",
      width: "8px", // Smaller coin size
      height: "8px", // Smaller coin size
      background: "#fbbf24",
      border: "1px solid #b45309", // Thinner border
      borderRadius: "50%",
      animation: "drop 2s ease-in infinite",
    },
    coin1: {
      left: "30%",
      animationDelay: "0s",
    },
    coin2: {
      left: "50%",
      animationDelay: "0.5s",
    },
    coin3: {
      left: "70%",
      animationDelay: "1s",
    },
  };

  return (
    <div style={styles.root}>
      <div style={styles.jarContainer}>
        <div style={styles.jar}>
          <div style={styles.jarTop}></div>
          <div style={styles.jarBody}>
            <div style={styles.fillLevel}></div>
          </div>
          <div style={styles.coins}>
            <div style={{ ...styles.coin, ...styles.coin1 }}></div>
            <div style={{ ...styles.coin, ...styles.coin2 }}></div>
            <div style={{ ...styles.coin, ...styles.coin3 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsJar;