import { SearchResultItem } from "../../utils/mapSearchResults";
import styles from "./itemDetails.module.css";

export const ItemInfo = ({
  title,
  date_created,
  description,
  keywords,
  location,
  photographer,
}: SearchResultItem) => {
  return (
    <div className={styles.itemDetailsInfo}>
      <h2> {title} </h2>
      <ul className={styles.itemDetailsInfoList}>
        <li>
          <span> Photographer: </span> {photographer}
        </li>
        <li>
          <span> Description: </span> {description}
        </li>
        <li>
          <span> Date Created: </span> {date_created}
        </li>
        <li>
          <p>
            <span> Location: </span> {location}
          </p>
        </li>
      </ul>
      <div className={styles.keywords}>
        <h3>Keywords:</h3>
        <ul>
          {keywords?.map((keyword, index) => {
            return (
              <li className="appShadow" key={keyword + index}>
                {keyword}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
