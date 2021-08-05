import { useStore } from "@/store";
import authApi from "@/utils/api/auth";
import router from "@/router";

export default async () :Promise<void> => {
    const { auth } = useStore();
    try {
      await authApi.logout();
      auth.setUser(undefined);
      localStorage.removeItem('token');
      router.push({name: "login"});
    } catch (err) {
      console.error(err);
    }
  };