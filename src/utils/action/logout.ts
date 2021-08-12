import authApi from "@/utils/api/auth";
import clearAuthAndRedirectToLogin from "./clearAuthAndRedirectToLogin";

const logout = async (): Promise<void> => {
    try{
        await authApi.logout();
        clearAuthAndRedirectToLogin();
    }catch(err){
        console.error(err)
    }
}

export default logout;