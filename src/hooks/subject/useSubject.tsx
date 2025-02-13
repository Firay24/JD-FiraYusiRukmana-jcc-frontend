import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";

export interface SubjectResponse {
  id: string;
  name: string;
}

export const useSubject = () => {
  const router = useRouter();
  const { get } = useHttp();

  const listSubject = async () => {
    try {
      const response: HttpResponse<SubjectResponse[]> = await get("/subject/list");
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  return { listSubject };
};
