export const getBlobFromBase64 = (base64StringWithMime: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      const [mimeInfo, base64String] = base64StringWithMime.split(",");

      // Extract MIME type from the string "data:[mimeType];base64,[base64String]"
      const mimeType = mimeInfo.match(/data:(.*);base64/)?.[1];

      if (!mimeType) {
        throw new Error("Invalid base64 string format");
      }

      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      resolve(blob);
    } catch (error) {
      reject(new Error("Failed to convert base64 to Blob"));
    }
  });
};
