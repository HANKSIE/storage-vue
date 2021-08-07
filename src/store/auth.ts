import { reactive, readonly } from "vue";
import User from "@/type/user";

interface State {
    user: User|undefined
}

const originState: State = { 
    user: undefined,
};

const state = reactive(originState);

const setUser = (user: User) => state.user = user;
const removeUser = () => state.user = undefined;

export default { 
    state: readonly(state),
    setUser,
    removeUser
};