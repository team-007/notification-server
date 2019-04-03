const express = require('express');
const router = express.Router();
const firebaseAdmin = require('firebase-admin');
const {google} = require('googleapis');
const path = require('path');

let accountKey = require(path.join(__dirname, '../tokeniqcapstone-firebase-adminsdk-1vdls-e27bb723f1.json'));

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(accountKey),
});

function getAccessToken() {
    return new Promise(function(resolve, reject) {
        let jwtClient = new google.auth.JWT(
            accountKey.client_email,
            null,
            accountKey.private_key,
            ['https://www.googleapis.com/auth/firebase.messaging'],
            null
        );
        jwtClient.authorize(function(err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}

/**
 * Verifies that the necessary values fot Firebase Cloud Messaging are provided.
 * @param body
 * @returns {boolean}
 */
function verifyParameters(body) {
    //TODO:
    return true
}

router.post('/', function(req, res, next) {
    console.log(req.body);
    getAccessToken().then(console.log);
    if (verifyParameters(req.body)) {
        //    TODO: make call to Firebase Cloud Messaging here
        //      FCM documentation: https://firebase.google.com/docs/cloud-messaging/auth-server
        res.status(202).send();
    } else {
        res.status(400).send()
    }
});

module.exports = router;
