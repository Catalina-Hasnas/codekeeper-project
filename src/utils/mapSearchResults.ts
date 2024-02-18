export type SearchResultItem = {
  thumbnail: string;
  title: string;
  nasa_id: string;
  location: string;
  photographer: string;
  description: string;
  keywords: string[];
  date_created?: string;
};

type SearchResult = {
  collection: {
    items: {
      data: {
        title: string;
        nasa_id: string;
        center: string;
        date_created?: string;
        location?: string;
        secondary_creator?: string;
        photographer?: string;
        description?: string;
        keywords?: string[];
      }[];
      links: {
        href: string;
      }[];
    }[];
  };
};

export const mapSearchResults = (result: SearchResult): SearchResultItem[] => {
  return result.collection.items.map((item) => {
    const thumbnailLink = item.links[0].href;
    const data = item.data[0];
    return {
      thumbnail: thumbnailLink,
      title: data.title,
      nasa_id: data.nasa_id,
      location: data.location || data.center || "unknown",
      photographer: data.photographer || data.secondary_creator || "unknown",
      description: data.description || "no description provided",
      keywords: data.keywords || [],
      date_created: data.date_created,
    };
  });
};
