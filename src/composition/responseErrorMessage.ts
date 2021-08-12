import { AxiosError } from "axios";
import { ref } from "vue";
import ValidateResponse from "@/type/response/validate";

const useResponseErrorMessage = () => {
    const errorMessages = ref<string[]>([]);

    const setErrorMessages = (error: any) => {
        try{
            const axiosErr = error as AxiosError;
            if (axiosErr.response?.status == 422) {
                const data: ValidateResponse = axiosErr.response.data;
                const errs = data.errors;
                const messages = Object.keys(errs).map((key) => errs[key][0]);
                errorMessages.value.unshift(...messages);
            }

            if (axiosErr.response?.status == 401) {
                errorMessages.value.unshift("帳號或密碼錯誤");
            }
        }catch(err){
            console.error(err);
        }
    }

    const clearErrorMessages = () => errorMessages.value = [];

    return {
        errorMessages,
        setErrorMessages,
        clearErrorMessages
    };
}

export default useResponseErrorMessage;