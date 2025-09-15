import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import './Globe.css'

const TranslationDropdown = () => {
  const [language, setLanguage] = useState("ar");
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const changeLanguageI18 = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setLanguage(savedLang);
      changeLanguageI18(savedLang);
    } else {
      // Set default language
      setLanguage("ar");
      changeLanguageI18("ar");
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    changeLanguageI18(lang);
    localStorage.setItem("language", lang);
    setIsOpen(false); // Close dropdown after selection
  };

  // Update language state when i18n language changes
  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <div className="dropdown-container">
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-trigger">
        <span style={{ fontSize: "20px", color: "black" }}>🌍</span>
      </button>
      {isOpen && (
        <div className={`${isMobile? "dropdown-menu-mobile":"dropdown-menu"}`}>
          <button onClick={() => changeLanguage("ar")} className="dropdown-item">
            {language === "ar" ? "✔ " : ""}العربية
          </button>
          <button onClick={() => changeLanguage("he")} className="dropdown-item">
            {language === "he" ? "✔ " : ""}עברית
          </button>
          <button onClick={() => changeLanguage("en")} className="dropdown-item">
            {language === "en" ? "✔ " : ""}English
          </button>
        </div>
      )}
    </div>
  );
};

export default TranslationDropdown;