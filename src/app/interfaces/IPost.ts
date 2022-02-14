import {IModel} from "./IModel";
import {IUser} from "./IUser";

export type PostScope = "public" | "friends" | "private";

export interface IPost extends IModel {
    description: string;
    videoUrl: string;
    videoVolume: number;
    user: string | IUser | any;
    tags: string[];
    active: boolean;
    scope: PostScope;
    comments: any[];
    liked?: boolean;
    likes: any[];
    views: any[];
    shares: any[];
    screenshots: any[];
}

export interface IUploadPost {
    videoUrl: string;
    description: string;
    scope: PostScope
    tags: string[];
}

