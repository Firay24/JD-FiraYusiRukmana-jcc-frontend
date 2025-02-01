import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";

interface RegisterResponse {
  statusCode: number;
  message: string;
  data: any;
}

export const useRegister = () => {
  const router = useRouter();
  const { post } = useHttp();

  const register = async (data: { username: string; name: string; email: string; password: string; roleId: string; birthdate: number; gender: boolean; phoneNumber: string }) => {
    try {
      const response: HttpResponse<RegisterResponse> = await post("/auth/sign-up", data);
      router.push("/auth/sign-in");
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return { register };
};
