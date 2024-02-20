import { useParams } from "react-router-dom";
import { fetcher, root } from "utils/fetcher";
import useSWR from "swr";
import { mapSearchResults } from "utils/mapSearchResults";
import { BackButton } from "Components/ItemDetails/BackButton";
import { ItemInfo } from "Components/ItemDetails/ItemInfo";
import styles from "./detailsPage.module.css";

const findSmallImage = (arr: string[]) => {
  return arr.find((imageName) => imageName.includes("~small"));
};

export const DetailsPage = () => {
  const { nasa_id } = useParams();

  console.log(nasa_id);

  const {
    data: rawData,
    error,
    isLoading,
  } = useSWR(`${root}/search?nasa_id=${nasa_id}`, fetcher);

  const { data: rawImageData, isLoading: imageIsLoading } = useSWR(
    rawData ? rawData.collection.items[0].href : null,
    fetcher
  );

  if (isLoading || imageIsLoading) {
    return <p>loading...</p>;
  }

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
              src={rawImageData ? findSmallImage(rawImageData) : data.thumbnail}
            ></img>
          </div>
          <ItemInfo {...data} />
        </article>
      </>
    );
  }
};
