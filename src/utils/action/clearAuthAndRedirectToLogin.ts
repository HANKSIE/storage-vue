import { useStore } from "@/store";
import router from "@/router";
import apiToken from "@/utils/token/apiToken";

const clearAuthAndRedirectToLogin = (): void => {
  const { auth } = useStore();
  auth.removeUser();
  apiToken.remove();
  router.push({name: "login"});
};

  export default clearAuthAndRedirectToLogin;