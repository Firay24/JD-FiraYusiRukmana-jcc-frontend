import { useAuthStore } from "@/state/auth.state";
import { HttpResponse, useHttp } from "../http/useHttp";
import { RoleType } from "@/constants/global.enums";
import { useRouter } from "next/navigation";

interface LoginResponse {
  username: string;
  role: {
    id: string;
    name: string;
  };
}

export const useLogin = () => {
  const router = useRouter();
  const { setProfile } = useAuthStore();
  const { post } = useHttp();

  const login = async (username: string, password: string) => {
    try {
      const response: HttpResponse<LoginResponse> = await post("/auth/sign-in", { username, password });
      if (response.data.role.name === RoleType.PARTICIPANT) router.push("/member");
      // setToken(response.data.token);
      setProfile(response.data);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return { login };
};
