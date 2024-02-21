import { SearchBar } from "./Components/SearchBar";
import styles from "./filterResults.module.css";
import { FilterYears } from "./Components/FilterYears";

export const FilterResults = () => {
  return (
    <section className={styles.filterResultsSection}>
      <SearchBar />
      <FilterYears />
    </section>
  );
};
