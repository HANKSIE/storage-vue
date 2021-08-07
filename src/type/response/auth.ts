import User from "../user";
export interface LoginResponse {
    token: string,
    user: User
}

export interface LoadUserResponse {
    user: User
}