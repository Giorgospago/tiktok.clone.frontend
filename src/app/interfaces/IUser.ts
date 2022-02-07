import {IModel} from "./IModel";
import {IPost} from "./IPost";

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
    posts: string[] | IPost[] | any;
    following: string[];
    followers: string[];
    gender: string;
    audioLikes: string[];
}
