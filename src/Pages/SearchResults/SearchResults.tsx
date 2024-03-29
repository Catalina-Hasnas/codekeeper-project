import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, root } from "utils/fetcher";
import { mapSearchResults } from "utils/mapSearchResults";
import { PreviewCard } from "Components/PreviewCard";
import styles from "./searchResults.module.css";
import { FilterResults } from "Components/FilterResults";
import { objectToUrlParams } from "utils/objToUrlParams";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const urlParams = objectToUrlParams(searchParams);

  const {
    data: rawData,
    error,
    isLoading,
  } = useSWR(
    `${root}/search?media_type=image${urlParams ? "&" + urlParams : ""}`,
    fetcher
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    throw new Error("Not found :(");
  }

  const data = mapSearchResults(rawData);

  if (data) {
    return (
      <>
        <FilterResults />
        <div className={styles.cardsGrid}>
          {data.length > 0
            ? data.map((item) => {
                return <PreviewCard key={item.nasa_id} item={item} />;
              })
            : "No results found"}
        </div>
      </>
    );
  }
};
