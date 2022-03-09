import {IModel} from "./IModel";
import {IUser} from "./IUser";

export interface IChat extends IModel {
    users: string[] | IUser[] | any;
    inactiveUsers?: string[] | IUser[] | any;
    name?: string;
    theme?: string;
    photo?: string;
    mute?: boolean;
    lastMessage?: IChatLastMessage;
}

export interface IChatLastMessage {
    chat: string;
    message: string;
    createdAt: string | Date;
}

export interface IChatMessage extends IModel {
    chat: string | IChat | any;
    sender: string | IUser | any;
    message: string;
    media: IChatMessageMedia[];
    read: string[] | IUser[] | any;
    untold: boolean;
}

export type IChatMessageMediaType = "photo" | "video" | "audio" | "link";

export interface IChatMessageMedia {
    type: IChatMessageMediaType;
    url: string;
}


