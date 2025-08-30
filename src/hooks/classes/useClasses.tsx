import { useRouter } from "next/navigation";
import { HttpResponse, useHttp } from "../http/useHttp";

export interface IClass {
  id: string;
  name: string;
}

export const useClasses = () => {
  const router = useRouter();
  const { get } = useHttp();

  const listClasses = async () => {
    try {
      const response: HttpResponse<IClass[]> = await get("/classes/list");
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  return { listClasses };
};
