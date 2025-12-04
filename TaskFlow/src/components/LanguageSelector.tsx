import { memo } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSelector.css";

const LanguageSelector = memo(function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-selector">
      <button
        className={`lang-btn ${i18n.language === "fr" ? "active" : ""}`}
        onClick={() => handleLanguageChange("fr")}
        title={t("language.fr")}
      >
        🇫🇷
      </button>
      <button
        className={`lang-btn ${i18n.language === "en" ? "active" : ""}`}
        onClick={() => handleLanguageChange("en")}
        title={t("language.en")}
      >
        🇬🇧
      </button>
    </div>
  );
});

export default LanguageSelector;
