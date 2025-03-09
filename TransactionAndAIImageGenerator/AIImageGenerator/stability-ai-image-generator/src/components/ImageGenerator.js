import axios from "axios";
import { useState } from "react";
import { API_KEY, API_URL } from "../config"; // Ensure API config is correct
import dreamGif from "../assests/dream.gif"; // Import the GIF

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("⚠ Please enter a valid prompt.");
      return;
    }

    setLoading(true);
    setImageUrl(""); // Clear previous image

    try {
      const response = await axios.post(
        API_URL,
        {
          prompt: prompt, // Ensure prompt is a string
          output_format: "webp",
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "multipart/form-data", // Ensure correct content type
            Accept: "image/*", // Expect image response
          },
          responseType: "blob", // Needed to handle images properly
        }
      );

      // Convert Blob to Image URL
      const imageBlob = new Blob([response.data]);
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectURL);
    } catch (error) {
      console.error("❌ Error generating image:", error.response?.data || error);
      alert("⚠ Failed to generate image. Check API key & request format.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container(imageUrl)}>
      <div style={styles.topSection}>
        <h2 style={styles.title}>
          Dream It, See It, Achieve It!
          <img src={dreamGif} alt="Dreaming" style={styles.gif} />
        </h2>
        <input
          type="text"
          placeholder="Enter image description..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={styles.inputBox}
        />
        <button onClick={generateImage} disabled={loading} style={styles.button}>
          {loading ? "Generating..." : "Picture Your Success"}
        </button>
      </div>

      {imageUrl && (
        <div style={styles.imageContainer}>
          <img src={imageUrl} alt="Generated" style={styles.image} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: (imageGenerated) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: imageGenerated ? "start" : "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6a0dad, #b565a7, #d291bc, #e0aaff)", // Purple shades
    textAlign: "center",
    padding: "20px",
    transition: "all 0.5s ease-in-out",
  }),
  topSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    textShadow: "0px 0px 15px rgba(255, 255, 255, 0.9)",
    color: "black",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  gif: {
    width: "100px",
    height: "100px",
  },
  inputBox: {
    width: "80%",
    maxWidth: "400px",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    textAlign: "center",
    background: "#d291bc",
    color: "black",
    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)",
  },
  button: {
    background: "linear-gradient(90deg, #6a0dad, #b565a7)",
    color: "white",
    padding: "10px 22px",
    borderRadius: "8px",
    fontSize: "17px",
    cursor: "pointer",
    transition: "transform 0.3s, background 0.3s",
    border: "none",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  imageContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    maxWidth: "320px",
    borderRadius: "15px",
    border: "4px solid white",
    boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.6)",
  },
};

export default ImageGenerator;
