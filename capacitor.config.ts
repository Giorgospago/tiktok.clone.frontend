/// <reference types="@capacitor/push-notifications" />

import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.trick.tok',
    appName: 'Trick Tok',
    webDir: 'www',
    bundledWebRuntime: false,
    plugins: {
        PushNotifications: {
            presentationOptions: ["badge", "sound", "alert"],
        },
    }
};

export default config;
