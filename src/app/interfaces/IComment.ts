import {IModel} from "./IModel";
import {IPost} from "./IPost";
import {IUser} from "./IUser";

export interface IComment extends IModel {
    post: string | IPost | any;
    user: string | IUser | any;
    comment: string | IComment | any;
    comments?: IComment[];
    text: string;
    untold: string[];
}
