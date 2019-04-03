const express = require('express');
const router = express.Router();
const firebaseAdmin = require('firebase-admin');
const {google} = require('googleapis');
const path = require('path');

let accountKey = require(path.join(__dirname, '../tokeniqcapstone-firebase-adminsdk-1vdls-e27bb723f1.json'));

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(accountKey),
});

/**
 * For Google OAuth. Get access token to use for interaction with Firebase
 * @returns {Promise<string>}
 */
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
 * Trigger Firebase Cloud Messaging to send notification to user
 * @param {Object} message Notification payload to send
 */
function sendNotification(message) {
    firebaseAdmin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

/**
 * Verifies that the necessary values fot Firebase Cloud Messaging are provided.
 * @param body
 * @returns {boolean}
 */
function verifyParameters(body) {
    return body.hasOwnProperty('data') && body.hasOwnProperty('token') && body.hasOwnProperty('topic') && body.hasOwnProperty('condition')
}

/**
 * Parse body.data to JSON
 * @param {Object} body
 * @returns {Object}
 */
function parseBody(body) {
    body.data = JSON.parse(body.data);
    return body;
}

router.post('/', function(req, res, next) {
    if (verifyParameters(req.body)) {
        let message = parseBody(req.body);
        sendNotification(message);
        res.status(202).send();
    } else {
        res.status(400).send()
    }
});

module.exports = router;
