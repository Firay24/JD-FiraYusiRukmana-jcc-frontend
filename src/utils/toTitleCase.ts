export const toTitleCase = (input: string): string => {
  return input
    .toLowerCase()
    .split(" ")
    .filter((word) => word.trim() !== "")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
