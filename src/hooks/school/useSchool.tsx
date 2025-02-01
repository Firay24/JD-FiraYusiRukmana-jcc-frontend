import { useRouter } from "next/navigation";
import { HttpResponse, useHttp } from "../http/useHttp";
import { TList } from "./type";

export const useSchollStore = () => {
  // Hooks
  const { get } = useHttp();
  const router = useRouter();

  const list = async (stage: string) => {
    try {
      const response: HttpResponse<TList[]> = await get(`/school/list?stage=${stage}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  return { list };
};
