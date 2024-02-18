import { useRef } from "react";
import { SearchBarIcon } from "./Components/SearchBarIcon";
import styles from "./searchBar.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchBar = () => {
  const [searchParams] = useSearchParams();

  const inputSearchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputSearchRef.current) {
      if (inputSearchRef.current.value) {
        navigate({
          pathname: "/search",
          search: `?q=${inputSearchRef.current.value}`,
        });
      } else {
        navigate("/");
      }
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
