import {IUser} from "./IUser";

export interface IAuthLoginData {
    email: string;
    password: string;
}

export interface IAuthLoginResult {
    accessToken: string;
    user: Partial<IUser>
}
