import {Injectable} from '@angular/core';
import {ToastController, ToastOptions} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(
        public toastController: ToastController,
    ) {
    }

    public async toast(options: Partial<ToastOptions> = {}) {
        const toast = await this.toastController.create({
            header: 'Error',
            message: "message",
            icon: 'close-outline',
            position: 'bottom',
            color: "danger",
            duration: 2000,
            animated: true,
            ...options
        });
        await toast.present();
    }
}
