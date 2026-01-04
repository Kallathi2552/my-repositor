import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <h2>Theme Changer</h2>

      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
