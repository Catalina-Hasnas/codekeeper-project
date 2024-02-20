import { useRef } from "react";
import { SearchBarIcon } from "./Components/SearchBarIcon";
import styles from "./searchBar.module.css";
import { useSearchParams } from "react-router-dom";

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputSearchRef.current) {
      setSearchParams((searchParams) => {
        if (inputSearchRef.current?.value) {
          searchParams.set("q", inputSearchRef.current.value);
        } else {
          // removes the query param if the user submits an empty string
          //TODO: Implement a "remove" button on input in order to remove the filter
          searchParams.delete("q");
        }
        return searchParams;
      });
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit} role="search">
      <input
        ref={inputSearchRef}
        type="text"
        placeholder="Search for a keyword..."
        name="search bar"
        className="appShadow"
        defaultValue={searchParams.get("q") || ""}
      />
      <button
        title="search"
        aria-label="search"
        type="submit"
        className={styles.searchIcon}
      >
        <SearchBarIcon />
      </button>
    </form>
  );
};
