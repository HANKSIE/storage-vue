import { useStore } from "@/store";
import authApi from "@/utils/api/auth";
import router from "@/router";
import apiToken from "@/utils/token/apiToken";

export default async () :Promise<void> => {
 
    try {
      await authApi.logout();
      const { auth } = useStore();
      auth.removeUser();
      apiToken.remove();
      router.push({name: "login"});
    } catch (err) {
      console.error(err);
    }
  };