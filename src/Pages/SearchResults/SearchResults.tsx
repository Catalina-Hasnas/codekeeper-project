import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { mapSearchResults } from "../../utils/mapSearchResults";
import { PreviewCard } from "../../Components/PreviewCard/PreviewCard";
import styles from "./searchResults.module.css";
import { FilterResults } from "../../Components/FilterResults/FilterResults";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const {
    data: rawData,
    error,
    isLoading,
  } = useSWR(
    `https://images-api.nasa.gov/search?q=${
      searchParams.get("q") ?? ""
    }&media_type=image`,
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
          {data.map((item) => {
            return <PreviewCard key={item.nasa_id} item={item} />;
          })}
        </div>
      </>
    );
  }
};
