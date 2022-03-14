import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingController} from '@ionic/angular';
import {ToastController} from '@ionic/angular';
import {AuthService} from "../../services/http/auth.service";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";
import {FireService} from "../../services/general/fire.service";
import {LoginType} from "../../interfaces/auth";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public form: FormGroup;
    public errors: any = {};

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        public loadingController: LoadingController,
        public toastController: ToastController,
        private ls: LocalStorageService,
        private router: Router,
        public fire: FireService
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    public initForm() {
        this.form = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(5)]]
        });
    }

    public async login(type: LoginType = "basic") {
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });
        await loading.present();
        this.errors = {};

        let loginMethod;
        switch (type) {
            case "basic":
                loginMethod = this.authService.login(this.form.value);
                break;
            case "google":
                loginMethod = await this.fire.socialLogin("google");
                break;
            case "facebook":
                loginMethod = await this.fire.socialLogin("facebook");
                break;
        }

        loginMethod.subscribe(
                (response) => {
                    if (response.success) {
                        this.ls.store("token", response.data.accessToken);
                        this.ls.store("user", response.data.user);
                        this.router.navigate(["/"]);
                    } else {
                        this.toast(response.message);
                    }
                    loading.dismiss();
                },
                (response) => {
                    loading.dismiss();
                    for (const err of response.error.errors) {
                        if (!this.errors[err.param]) {
                            this.errors[err.param] = [];
                        }
                        this.errors[err.param].push(err.msg);
                    }
                }
            );
    }

    public async toast(message: string = "") {
        const toast = await this.toastController.create({
            header: 'Error',
            message: message,
            icon: 'close-outline',
            position: 'bottom',
            color: "danger",
            duration: 2000,
            animated: true
        });
        await toast.present();
    }
}
