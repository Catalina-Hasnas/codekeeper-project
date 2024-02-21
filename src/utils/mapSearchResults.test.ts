import { mapSearchResults } from "./mapSearchResults";
import { data } from "./testUtils/server";

const expectedResult = [
  {
    thumbnail: data.collection.items[0].links[0].href,
    title: data.collection.items[0].data[0].title,
    nasa_id: data.collection.items[0].data[0].nasa_id,
    location: data.collection.items[0].data[0].location,
    photographer: data.collection.items[0].data[0].photographer,
    description: data.collection.items[0].data[0].description,
    keywords: data.collection.items[0].data[0].keywords,
    date_created: "January 30, 1957",
  },
];

const modifiedLocationPhotographerData = {
  ...data,
  collection: {
    ...data.collection,
    items: [
      {
        ...data.collection.items[0],
        data: data.collection.items[0].data.map((dataItem) => ({
          ...dataItem,
          location: "",
          photographer: "",
          description: "",
          date_created: "",
        })),
      },
      ...data.collection.items,
    ],
  },
};

const modifiedExpectedResultLocationPhotographer = [
  {
    ...expectedResult[0],
    location: data.collection.items[0].data[0].center,
    photographer: data.collection.items[0].data[0].secondary_creator,
    description: "no description provided",
    date_created: "unknown",
  },
  ...expectedResult,
];

test("it maps search results correctly", () => {
  const result = mapSearchResults(data);
  expect(result).toStrictEqual(expectedResult);
});

test("in absence of optional properties, it displays fallbacks", () => {
  const result = mapSearchResults(modifiedLocationPhotographerData);
  expect(result).toStrictEqual(modifiedExpectedResultLocationPhotographer);
});
