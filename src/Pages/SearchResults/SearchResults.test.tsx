import { HttpResponse, http } from "msw";
import {
  render,
  waitForElementToBeRemoved,
  screen,
  fireEvent,
} from "utils/testUtils/render";
import { SearchResults } from "./SearchResults";
import { data, server } from "utils/testUtils/server";

const searchBarInput = "apollo";
const yearStartInput = "2000";
const yearEndInput = "2020";

test("By default, it displays the results of querying the api by media_type=image", async () => {
  server.use(
    http.get("https://images-api.nasa.gov/search", async ({ request }) => {
      expect(request.url).toEqual(
        "https://images-api.nasa.gov/search?media_type=image"
      );
      return HttpResponse.json(data);
    })
  );

  render(<SearchResults />);

  await waitForElementToBeRemoved(() => screen.getByText("loading..."));

  expect(screen.getByText("The title")).toBeInTheDocument();
  expect(screen.getByText("photographer")).toBeInTheDocument();
  expect(screen.getByText("nasa_location")).toBeInTheDocument();
});

test("On user input, it queries the API with search params from search bar", async () => {
  server.use(
    http.get("https://images-api.nasa.gov/search", async ({ request }) => {
      expect(request.url).toEqual(
        `https://images-api.nasa.gov/search?media_type=image&q=${searchBarInput}`
      );
      return HttpResponse.json(data);
    })
  );

  render(<SearchResults />);

  const input = screen.getByPlaceholderText("Search for a keyword...");
  const button = screen.getByRole("button", { name: /search/i });

  fireEvent.change(input, { target: { value: searchBarInput } });
  fireEvent.click(button);

  await waitForElementToBeRemoved(() => screen.getByText("loading..."));
});

test("On user input, it queries the API with search params from year start and end inputs", async () => {
  server.use(
    http.get("https://images-api.nasa.gov/search", async ({ request }) => {
      expect(request.url).toBe(
        `https://images-api.nasa.gov/search?media_type=image&q=${searchBarInput}&year_start=${yearStartInput}&year_end=${yearEndInput}`
      );
      return HttpResponse.json(data);
    })
  );

  render(<SearchResults />, { initialEntries: ["/search?q=apollo"] });

  const startYearInput = screen.getByRole("spinbutton", { name: "Year Start" });
  const endYearInput = screen.getByRole("spinbutton", { name: "Year End" });
  const button = screen.getByText("Add filter");

  fireEvent.change(startYearInput, { target: { value: yearStartInput } });
  fireEvent.change(endYearInput, { target: { value: yearEndInput } });
  fireEvent.click(button);

  await waitForElementToBeRemoved(() => screen.getByText("loading..."));
});
