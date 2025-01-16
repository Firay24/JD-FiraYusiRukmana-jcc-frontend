import { NextResponse } from "next/server";
import sharp, { ResizeOptions } from "sharp";

interface ResizeRequestBody {
  options: ResizeOptions;
  image: string; // Base64 encoded string
}

export interface ResizeImageResponse {
  base64: string;
}

type Format = keyof sharp.FormatEnum | sharp.AvailableFormatInfo;

export async function POST(req: Request): Promise<NextResponse<ResizeImageResponse>> {
  let { options, image }: ResizeRequestBody = await req.json();

  const removeImageFormat = image.replace(/^data:image\/\w+;base64,/, "");
  const format: Format = image.split(";")[0].split("/")[1] as Format;

  const imageBuffer = Buffer.from(removeImageFormat, "base64");

  const { width, height } = await sharp(imageBuffer).metadata();
  const isSmall = (width ?? 0) <= (options.width ?? 0) && (height ?? 0) <= (options.height ?? 0);

  const resizedImageBuffer = isSmall ? imageBuffer : await sharp(imageBuffer).resize(options).toFormat(format).toBuffer();

  const resizedImageBase64 = resizedImageBuffer.toString("base64");
  const resizedImageWithFormat = `data:image/${format};base64,${resizedImageBase64}`;

  return NextResponse.json({ base64: resizedImageWithFormat }, { status: 200 });
}
