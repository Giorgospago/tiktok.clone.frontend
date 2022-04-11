import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IResponse} from "../../interfaces/IReponse";
import {environment} from "../../../environments/environment";
import {IAudio} from "../../interfaces/IAudio";

@Injectable({
    providedIn: "root"
})
export class AudioService {

    constructor(
        private http: HttpClient
    ) {
    }

    public getAudio(audioId: string) {
        return this.http.get<IResponse<IAudio>>(environment.api + `/audio/${audioId}`);
    }

}
