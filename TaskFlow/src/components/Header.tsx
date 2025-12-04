import { memo } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Header.css";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";


const Header = memo(function Header() {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <div className="header-brand">
            <h1>📋 {t("common.appName")}</h1>
            <p className="subtitle">{t("common.tagline")}</p>
          </div>
          <div className="header-actions">
            <nav className="header-nav">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {t("nav.home")}
              </NavLink>
            </nav>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
