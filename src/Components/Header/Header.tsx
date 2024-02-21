import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { useThemeProvider } from "providers/ThemeProvider";

export const Header = () => {
  const { isDarkTheme, toggleIsDarkTheme } = useThemeProvider();

  return (
    <header className={`${styles.header} appShadow`}>
      <h1>
        <Link to={"/"}>NASA Images</Link>
      </h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleIsDarkTheme();
        }}
      >
        {isDarkTheme ? "Light Theme" : "Dark Theme"}
      </button>
    </header>
  );
};
