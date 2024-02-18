import { SearchResultItem } from "../../utils/mapSearchResults";
import styles from "./itemDetails.module.css";

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const ItemInfo = ({
  title,
  date_created,
  description,
  keywords,
  location,
  photographer,
}: SearchResultItem) => {
  const dateFormatted = date_created
    ? new Date(date_created).toLocaleDateString("en-US", dateOptions)
    : "unknown";

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
          <span> Date Created: </span> {dateFormatted}
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
          {keywords.length > 0
            ? keywords?.map((keyword, index) => {
                return (
                  <li className="appShadow" key={keyword + index}>
                    {keyword}
                  </li>
                );
              })
            : "No keywords provided"}
        </ul>
      </div>
    </div>
  );
};
