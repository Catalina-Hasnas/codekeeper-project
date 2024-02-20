import { fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";
import { render } from "utils/testUtils/render";

test("SearchBar submits the input value", () => {
  const { getByPlaceholderText, getByRole } = render(<SearchBar />);

  const input = getByPlaceholderText("Search for a keyword...");
  const button = getByRole("button", { name: /search/i });

  fireEvent.change(input, { target: { value: "test" } });
  fireEvent.click(button);

  expect(window.location.search).toBe("?q=test");
});
