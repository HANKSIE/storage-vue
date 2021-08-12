import { ref } from "vue";

const useLoading = (val = true) => {
    const loading = ref<boolean>(val);
    const loadingStart = () => loading.value = true;
    const loadingEnd = () => loading.value = false;
    const loadingFunc = (handle: CallableFunction) => async(...args: any[]) =>{
        loadingStart();
        await handle(...args);
        loadingEnd();
    }

    return {
        loading,
        loadingFunc,
        loadingStart,
        loadingEnd
    };
}

export default useLoading;