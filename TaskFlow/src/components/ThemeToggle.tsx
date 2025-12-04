import { useTheme } from "../contexts/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Basculer vers le thème ${
        theme === "light" ? "sombre" : "clair"
      }`}
    >
      <span className="icon-wrapper">
        <span className={`icon moon ${theme === "light" ? "active" : "exit"}`}>
          🌙
        </span>
        <span className={`icon sun ${theme === "dark" ? "active" : "exit"}`}>
          ☀️
        </span>
      </span>
    </button>
  );
}

export default ThemeToggle;
