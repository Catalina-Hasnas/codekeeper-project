import { useNavigate } from "react-router-dom";
import styles from "./itemDetails.module.css";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.backButton} appShadow`}
      onClick={(e) => {
        e.preventDefault;
        navigate(-1);
      }}
    >
      <span>Back</span>
    </button>
  );
};
