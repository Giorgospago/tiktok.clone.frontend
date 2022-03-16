importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
    projectId: 'trick-tok-684e8',
    appId: '1:24231743892:web:064f14c65f79e8800dbf81',
    storageBucket: 'trick-tok-684e8.appspot.com',
    apiKey: 'AIzaSyCtM13fuSNeQG0jeV0RVGEoMfBhNOHx6Ig',
    authDomain: 'trick-tok-684e8.firebaseapp.com',
    messagingSenderId: '24231743892',
});

const messaging = firebase.messaging();
