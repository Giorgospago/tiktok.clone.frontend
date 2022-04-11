import {IModel} from "./IModel";

export interface IAudio extends IModel {
    url: string;
    name: string;
    firstPost: string;
    meta: IAudioMeta
}

export interface IAudioMeta {
    title: string;
    album: string;
    artist: string;
    release_date: string;
    label: string;
    timecode: string;
    song_link: string;
    lyrics: any;
    apple_music: any;
    spotify: any;
    [key: string]: any;
}
