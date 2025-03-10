import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <label>{t("language")}: </label>
      <select onChange={changeLanguage} defaultValue={i18n.language}>
        <option value="en">🇺🇸 English</option>
        <option value="hi">🇮🇳 हिन्दी</option>
        <option value="de">🇩🇪 Deutsch</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
