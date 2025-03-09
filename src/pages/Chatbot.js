import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Create and append the Dialogflow Messenger script
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script on unmount
    };
  }, []);

  return (
    <div>
      {/* Dialogflow Messenger Component */}
      <df-messenger
        intent="WELCOME"
        chat-title="FinancialBot"
        agent-id="31b22ad9-bb8b-4635-b23f-e232d0e06eea"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default Chatbot;