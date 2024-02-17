import { Link } from "react-router-dom";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={`${styles.header} appShadow`}>
      <h1>
        <Link to={"/"}>Nasa Images</Link>
      </h1>
    </header>
  );
};
