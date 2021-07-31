import { useStore } from "@/store";
import api from "@/utils/api";
import router from "@/router";

export default async () => {
    const { auth } = useStore();
    try {
      await api.auth.logout();
      auth.setUser(undefined);
      router.push({name: "login"});
    } catch (err) {
      console.error(err);
    }
  };