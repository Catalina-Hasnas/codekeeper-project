import { useParams } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import useSWR from "swr";
import { mapSearchResults } from "../../utils/mapSearchResults";
import { BackButton } from "../../Components/ItemDetails/BackButton";
import { ItemInfo } from "../../Components/ItemDetails/ItemInfo";
import styles from "./detailsPage.module.css";

export const DetailsPage = () => {
  const { nasa_id } = useParams();

  const {
    data: rawData,
    error,
    isLoading,
  } = useSWR(`https://images-api.nasa.gov/search?nasa_id=${nasa_id}`, fetcher);

  if (isLoading) {
    return <p>loading...</p>;
  }

  console.log(rawData);

  if (error || rawData.collection.metadata.total_hits === 0) {
    throw new Error("Not found :(");
  }

  const data = mapSearchResults(rawData)[0];

  if (data) {
    return (
      <>
        <BackButton />
        <article className={styles.itemDetailsContainer}>
          <div className={styles.itemDetailsImageContainer}>
            <img
              className={styles.itemDetailsImage}
              alt={data.title}
              src={data.thumbnail}
            ></img>
          </div>
          <ItemInfo {...data} />
        </article>
      </>
    );
  }
};
