const firebaseAdmin = require('firebase-admin');
const firebase = require('firebase');

module.exports = {
    admin: function () {
        let accountKey = require(path.join(__dirname, '../tokeniqcapstone-firebase-adminsdk-1vdls-e27bb723f1.json'));

        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(accountKey),
        });
        return firebaseAdmin
    },
    firebase: function () {
        let firebaseConfig = {
            apiKey: "AIzaSyAwngnvYjLZWcNf_OA5q9AFFnaZ1kaAcrE",
            authDomain: "tokeniqcapstone.firebaseapp.com",
            databaseURL: "https://tokeniqcapstone.firebaseio.com",
            projectId: "tokeniqcapstone",
            storageBucket: "tokeniqcapstone.appspot.com",
            messagingSenderId: "1054476361904",
            appId: "1:1054476361904:web:ae32ce31aa8e56e1105b75"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        return firebase
    }


};