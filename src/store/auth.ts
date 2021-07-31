import { reactive, readonly } from "vue";
import User from "@/type/user";

interface State {
    user: User|undefined
}

const originState: State = { 
    user: undefined,
};

const state = reactive(originState);

const setUser = (user: User|undefined) => state.user = user;

export default { 
    state: readonly(state),
    setUser,
};