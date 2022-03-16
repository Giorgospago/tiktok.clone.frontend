import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingController} from '@ionic/angular';
import {AuthService} from "../../services/http/auth.service";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";
import {FireService} from "../../services/general/fire.service";
import {LoginType} from "../../interfaces/auth";
import {ToastService} from "../../services/general/toast.service";

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
        private ls: LocalStorageService,
        private router: Router,
        public fire: FireService,
        private toast: ToastService
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
            default:
                try {
                    loginMethod = await this.fire.socialLogin(type);
                } catch (e) {
                    this.toast.toast({
                        message: e.message,
                        duration: 10000
                    });
                    loading.dismiss();
                }
        }

        loginMethod.subscribe(
                (response) => {
                    if (response.success) {
                        this.ls.store("token", response.data.accessToken);
                        this.ls.store("user", response.data.user);
                        this.router.navigate(["/"]);
                    } else {
                        this.toast.toast({
                            message: response.message
                        });
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
}
