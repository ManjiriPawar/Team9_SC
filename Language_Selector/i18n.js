import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import de from "./locales/de.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  de: { translation: de },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Use English if translation is missing
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
