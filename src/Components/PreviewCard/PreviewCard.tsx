import { Link } from "react-router-dom";
import { SearchResultItem } from "../../utils/mapSearchResults";
import styles from "./previewCard.module.css";

export const PreviewCard = ({ item }: { item: SearchResultItem }) => {
  return (
    <article className={`${styles.previewCard} appShadow`}>
      <div className={styles.previewCardImageContainer}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className={styles.previewCardImage}
        ></img>
      </div>
      <div className={styles.previewCardPresentationText}>
        <Link to={`/nasa_id/${item.nasa_id}`}>{item.title}</Link>
        <ul>
          <li>
            <span> Photographer: </span> {item.photographer ?? "unknown"}
          </li>
          <li>
            <span> Location: </span> {item.location ?? "unknown"}
          </li>
        </ul>
      </div>
    </article>
  );
};
