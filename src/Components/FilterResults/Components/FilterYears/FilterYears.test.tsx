import { fireEvent } from "@testing-library/react";
import { FilterYears } from "./FilterYears";
import { render } from "utils/testUtils/render";
import { afterEach } from "vitest";

afterEach(() => {
  const params = new URLSearchParams(window.location.search);
  params.delete("year_start");
  params.delete("year_end");
  window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
});

test("FilterYears submits the input values", () => {
  const { getByText, getByRole } = render(<FilterYears />);

  const startYearInput = getByRole("spinbutton", { name: "Year Start" });
  const endYearInput = getByRole("spinbutton", { name: "Year End" });
  const button = getByText("Add filter");

  fireEvent.change(startYearInput, { target: { value: "2000" } });
  fireEvent.change(endYearInput, { target: { value: "2020" } });
  fireEvent.click(button);

  expect(window.location.search).toBe("?year_start=2000&year_end=2020");
});

test("FilterYears submits only start year", () => {
  const { getByRole, getByText } = render(<FilterYears />);

  const startYearInput = getByRole("spinbutton", { name: "Year Start" });
  const button = getByText("Add filter");

  fireEvent.change(startYearInput, { target: { value: "2000" } });
  fireEvent.click(button);

  expect(window.location.search).toBe("?year_start=2000");
});

test("FilterYears submits only end year", () => {
  const { getByRole, getByText } = render(<FilterYears />);

  const endYearInput = getByRole("spinbutton", { name: "Year End" });
  const button = getByText("Add filter");

  fireEvent.change(endYearInput, { target: { value: "2020" } });
  fireEvent.click(button);

  expect(window.location.search).toBe("?year_end=2020");
});
