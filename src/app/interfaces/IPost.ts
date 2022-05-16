import {IModel} from "./IModel";
import {IUser} from "./IUser";
import {IComment} from "./IComment";
import {IAudio} from "./IAudio";

export type PostScope = "public" | "friends" | "private";
export type NudityValue = 'UNKNOWN' | 'VERY_UNLIKELY' | 'UNLIKELY' | 'POSSIBLE' | 'LIKELY' | 'VERY_LIKELY';

export interface IPost extends IModel {
    description: string;
    videoUrl: string;
    audio: string | IAudio | any;
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
    nudity: IPostNudity[];
}

export interface IUploadPost {
    videoUrl: string;
    description: string;
    scope: PostScope
    tags: string[];
}

export interface IPostNudity {
    timestamp: number;
    value: NudityValue;
}


export interface IPostSearchOptions {
    limit: number;
    seen?: string[];
    ids?: string[];
    audios?: string[];
}

export interface IPostTextSearchOptions {
    key: string;
}

export interface IPostTextSearchResult {
    posts: IPost[];
    users: IUser[];
    comments: IComment[];
}

export interface IShareData {
    receiver: string;
    post: string;
    message: string;
}

