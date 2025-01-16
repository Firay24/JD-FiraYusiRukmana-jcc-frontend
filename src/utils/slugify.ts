import slugifies from "slugify";

export const slugify = (text: string) => {
  const cleanedText = text.replace(/[^a-zA-Z0-9 ]/g, "-");
  return slugifies(cleanedText, { lower: true, strict: true }).replaceAll("_", "-");
};
