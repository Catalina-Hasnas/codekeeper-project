export const objectToUrlParams = (obj: URLSearchParams) => {
  return Array.from(obj.keys())
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(obj.get(key) || "")
    )
    .join("&");
};
