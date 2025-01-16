import path from "path";
import { NextResponse } from "next/server";
import opentype from "opentype.js";

export interface PlaceholderImageRequest {
  width?: number;
  height?: number;
  text?: string;
  color?: string;
  background?: string;
}

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255].join(",");
};

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const width = parseInt(url.searchParams.get("width") || "600", 10);
  const height = parseInt(url.searchParams.get("height") || "400", 10);
  const text = url.searchParams.get("text") || `${width}x${height}`;
  const background = url.searchParams.get("background") || "3b82f6";
  const color = url.searchParams.get("color") || "ffffff";

  const bgColor = hexToRgb(background ?? "3b82f6");
  const textColor = hexToRgb(color ?? "ffffff");

  const fontPath = path.join(process.cwd(), "public", "fonts", "inter.ttf");
  const font = opentype.loadSync(fontPath);

  let fontSize = height / 2;
  let fontGetPath = font.getPath(text, 0, 0, fontSize);
  let bbox = fontGetPath.getBoundingBox();

  while (bbox.x2 - bbox.x1 > width * 0.65) {
    fontSize -= 2;
    fontGetPath = font.getPath(text, 0, 0, fontSize);
    bbox = fontGetPath.getBoundingBox();
  }

  const x = (width - (bbox.x2 - bbox.x1)) / 2 - bbox.x1;
  const y = (height - (bbox.y2 - bbox.y1)) / 2 - bbox.y1;

  const finalFontPath = font.getPath(text, x, y, fontSize);
  finalFontPath.fill = `rgb(${textColor})`;
  const svgTextPath = finalFontPath.toSVG(2);

  const svgText = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="rgb(${bgColor})" />
      ${svgTextPath}
    </svg>
  `;

  return new NextResponse(svgText, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
