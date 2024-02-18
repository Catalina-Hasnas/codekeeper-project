import { useRef } from "react";
import styles from "./filterYears.module.css";
import { useSearchParams } from "react-router-dom";

const isYearValid = (year: number | null) => {
  if (!year) {
    return false;
  }
  const date = new Date(year, 0, 1);
  if (date.getFullYear() !== year) {
    return false;
  }
  const currentYear = new Date().getFullYear();
  if (year < 1946 || year > currentYear) {
    return false;
  }
  return true;
};

type SearchParams =
  | { year_start: string; year_end: string }
  | { year_start: string }
  | { year_end: string }
  | Record<string, never>;

const createSearchParams = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): SearchParams => {
  const startDateNumber = startDate ? parseInt(startDate) : null;
  const endDateNumber = endDate ? parseInt(endDate) : null;

  const isStartDateValid = isYearValid(startDateNumber);
  const isEndDateValid = isYearValid(endDateNumber);

  if (
    isStartDateValid &&
    isEndDateValid &&
    (endDateNumber as number) > (startDateNumber as number)
  ) {
    return { year_start: startDate, year_end: endDate };
  }

  if (endDateNumber === null && isStartDateValid) {
    return { year_start: startDate };
  }

  if (startDateNumber === null && isEndDateValid) {
    return { year_end: endDate };
  }
  //TODO: Throw validation errors here and catch them on submit, notify user of errors
  return {};
};

export const FilterYears = () => {
  const startYearRef = useRef<HTMLInputElement>(null);
  const endYearRef = useRef<HTMLInputElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const yearsSearchParams = createSearchParams({
      startDate: startYearRef.current ? startYearRef.current?.value : "",
      endDate: endYearRef.current ? endYearRef.current?.value : "",
    });

    setSearchParams((searchParams) => {
      //TODO: Implement a "remove" button on inputs in order to reset the filters
      searchParams.delete("year_start");
      searchParams.delete("year_end");
      for (const [key, value] of Object.entries(yearsSearchParams)) {
        searchParams.set(key, value);
      }
      return searchParams;
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.yearForm}>
      <div className={styles.yearFormItem}>
        <label htmlFor="year_start">Year Start</label>
        <input
          ref={startYearRef}
          type="number"
          className="appShadow"
          name="year_start"
          defaultValue={searchParams.get("year_start") || ""}
        ></input>
      </div>
      <div className={styles.yearFormItem}>
        <label htmlFor="year_end">Year end</label>
        <input
          ref={endYearRef}
          type="number"
          className="appShadow"
          name="year_end"
          defaultValue={searchParams.get("year_end") || ""}
        ></input>
      </div>
      <button title="add year filter" type="submit">
        Add filter
      </button>
    </form>
  );
};
