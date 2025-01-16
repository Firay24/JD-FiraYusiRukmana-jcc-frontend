import { ResizeOptions } from "sharp";
import { getBase64FromFile } from "./getBase64FromFile";
import { ResizeImageResponse } from "@/app/api/resize-image/route";

export const getBase64FromFileResized = async (file: File, options: ResizeOptions = { width: 1920, height: 1080, fit: "cover" }): Promise<string> => {
  const base64 = await getBase64FromFile(file);

  const response = await fetch("/api/resize-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      options,
      image: base64,
    }),
  });
  const json: ResizeImageResponse = await response.json();
  return json.base64;
};
