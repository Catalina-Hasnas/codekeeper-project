import {
  render,
  waitForElementToBeRemoved,
  screen,
} from "utils/testUtils/render";
import { DetailsPage } from "./DetailsPage";
import { data, imagesData, server } from "utils/testUtils/server";
import { HttpResponse, http } from "msw";

afterEach(() => server.resetHandlers());

test("It queries the api by nasa_id and another query using the response from the previous request", async () => {
  server.use(
    http.get("https://images-api.nasa.gov/search", () => {
      return HttpResponse.json(data);
    }),
    http.get("https://images-assets.nasa.gov/image/*", async ({ request }) => {
      expect(request.url).toEqual(data.collection.items[0].href);
      return HttpResponse.json(imagesData);
    })
  );

  render(<DetailsPage />, { initialEntries: ["/nasa_id/test_id"] });

  await waitForElementToBeRemoved(() => screen.getByText("loading..."));

  const expectedSrc = imagesData.find((imageName) =>
    imageName.includes("~small")
  );

  const image = screen.getByRole("img");

  expect(image).toHaveAttribute("src", expectedSrc);
});
