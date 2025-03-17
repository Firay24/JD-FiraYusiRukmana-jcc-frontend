import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";

interface IEventId {
  id: string;
}

export const useEvent = () => {
  const router = useRouter();
  const { get } = useHttp();

  const eventId = async ({ stage, level, subjectId, region }: { stage: string; level: string; subjectId: string; region: number }) => {
    try {
      const response: HttpResponse<IEventId> = await get(`/event/search?stage=${stage}&level=${level}&subjectId=${subjectId}&region=${region}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const pdfView = async (fileName: string) => {
    try {
      const response: HttpResponse<any> = await get(`/event/getpdf/${fileName}`);
      return response;
    } catch (error) {
      console.error("Save failed:", error);
      throw error;
    }
  };

  return { eventId, pdfView };
};
