import { SearchBar } from "./Components/SearchBar/SearchBar";
import styles from "./filterResults.module.css";
import { FilterYears } from "./Components/FilterYears/FilterYears";

export const FilterResults = () => {
  return (
    <section className={styles.filterResultsSection}>
      <SearchBar />
      <FilterYears />
    </section>
  );
};
