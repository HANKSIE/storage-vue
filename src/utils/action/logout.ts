import authApi from "@/utils/api/auth";
import router from "@/router";

export default async () :Promise<void> => {
    try {
      await authApi.logout();
      router.push({name: "login"});
    } catch (err) {
      console.error(err);
    }
  };