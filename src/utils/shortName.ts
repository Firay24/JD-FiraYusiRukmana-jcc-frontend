export function shortenName(fullName: string, maxLength: number = 20): string {
  const words = fullName.trim().split(/\s+/); // Pisah berdasarkan spasi
  let result = "";

  for (const word of words) {
    if (word.length > maxLength) {
      // Jika satu kata lebih panjang dari maxLength, skip
      continue;
    }

    const next = result ? `${result} ${word}` : word;

    if (next.length <= maxLength) {
      result = next;
    } else {
      break; // Kalau melebihi, stop
    }
  }

  return result;
}
