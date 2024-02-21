import { setupServer } from "msw/node";

export const server = setupServer();

export const data = {
  collection: {
    items: [
      {
        data: [
          {
            title: "The title",
            nasa_id: "test_id",
            center: "nasa_center",
            date_created: "1957-01-30T00:00:00Z",
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
        href: "https://images-assets.nasa.gov/image/test_id/collection.json",
      },
    ],
    metadata: {
      total_hits: 1,
    },
  },
};

export const imagesData = ["nasa_image~original.jpg", "nasa_image~small.jpg"];
