import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import {
  render,
  waitForElementToBeRemoved,
  screen,
} from "utils/testUtils/render";
import { SearchResults } from "./SearchResults";

const data = {
  collection: {
    items: [
      {
        data: [
          {
            title: "The title",
            nasa_id: "nasa_id",
            center: "nasa_center",
            date_created: new Date(),
            location: "nasa_location",
            secondary_creator: "creator",
            photographer: "photographer",
            description: "description",
            keywords: ["first keyword", "second keyword"],
          },
        ],
        links: [
          {
            href: "link",
          },
        ],
      },
    ],
  },
};

export const restHandlers = [
  http.get("https://images-api.nasa.gov/search", async () => {
    return HttpResponse.json(data);
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

test("It displays the results of querying the api by media_type=image", async () => {
  render(<SearchResults />);

  await waitForElementToBeRemoved(() => screen.getByText("loading..."));

  expect(screen.getByText("The title")).toBeInTheDocument();
  expect(screen.getByText("photographer")).toBeInTheDocument();
  expect(screen.getByText("nasa_location")).toBeInTheDocument();
});

// test("It queries the API using search params from user input", async () => {
//   const params = new URLSearchParams(window.location.search);
//   params.set("q", "apollo");
//   window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

//   render(<SearchResults />);

//   // expect(request.searchParams.get("q")).toBe("apollo");
// });
