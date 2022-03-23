import {IModel} from "./IModel";
import {IUser} from "./IUser";
import {IComment} from "./IComment";

export type PostScope = "public" | "friends" | "private";

export interface IPost extends IModel {
    description: string;
    videoUrl: string;
    videoVolume: number;
    thumbnailUrl: string;
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


export interface IPostSearchOptions {
    limit: number;
    seen: string[];
    ids?: string[];
}

export interface IPostTextSearchOptions {
    key: string;
}

export interface IPostTextSearchResult {
    posts: IPost[];
    users: IUser[];
    comments: IComment[];
}

