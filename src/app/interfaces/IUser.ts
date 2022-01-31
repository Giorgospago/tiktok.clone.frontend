import {IModel} from "./IModel";

export interface IUser extends IModel {
    name: string;
    username: string;
    email: string;
    photo: string;
    uid: string;
    password: string;
    bio: string;
    birthDate: Date;
    country: string;
    city: string;
    deviceTokens: string[];
    posts: string[];
    following: string[];
    followers: string[];
    gender: string;
    audioLikes: string[];
}
