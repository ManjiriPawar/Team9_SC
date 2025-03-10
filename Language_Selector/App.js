import React from "react";
import { useTranslation } from "react-i18next";
import "./i18n"; // Import i18n configuration
import LanguageSelector from "./components/LanguageSelector";

const App = () => {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{t("welcome")}</h1>
      <LanguageSelector />
    </div>
  );
};

export default App;
