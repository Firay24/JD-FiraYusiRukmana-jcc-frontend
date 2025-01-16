import { PlaceholderImageRequest } from "@/app/api/placeholder-image/route";

export const placeholderImage = (options: PlaceholderImageRequest): string => {
  const query = Object.entries(options)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return "/api/placeholder-image" + (query ? "?" + query : "");
};
