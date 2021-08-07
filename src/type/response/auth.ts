import User from "../user";

export type LoginResponse = {
    token: string,
    user: User
}

export type LoadUserResponse = {
    user: User
}