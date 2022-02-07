import {IModel} from "./IModel";

export type PostScope = "public" | "friends" | "private";

export interface IPost extends IModel {
    videoUrl: string;
}

export interface IUploadPost {
    videoUrl: string;
    description: string;
    scope: PostScope
    tags: string[];
}

