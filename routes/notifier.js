const express = require('express');
const router = express.Router();
const firebaseAdmin = require('firebase-admin');
const {google} = require('googleapis');
const path = require('path');
const jsonfile = require('jsonfile');

let accountKey = require(path.join(__dirname, '../tokeniqcapstone-firebase-adminsdk-1vdls-e27bb723f1.json'));

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(accountKey),
});

/**
 * Trigger Firebase Cloud Messaging to send notification to user
 * @param {Object} message Notification payload to send
 */
function sendNotification(message) {
    return new Promise((resolve, reject) => {
        firebaseAdmin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                resolve(response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                reject(error);
            });
    })
}

/**
 * Verifies that the necessary values fot Firebase Cloud Messaging are provided.
 * @param body
 * @returns {boolean}
 */
function verifyParameters(body) {
    return body.hasOwnProperty('data') && body.hasOwnProperty('username');
}

function getUser(username) {
    return new Promise((resolve, reject) => {
        let dbPath = path.join(__dirname, '../db.json');
        jsonfile.readFile(dbPath)
            .then(users => {
                let user = users.find(eachUser => eachUser.username === username);
                if (!user) return reject('User not found');
                resolve(user);
            })
            .catch(error => {
                reject('Error opening database file');
            });
    });
}

router.post('/', function(req, res, next) {
    if (verifyParameters(req.body)) {
        getUser(req.body.username)
            .then(user => {
                let message = {
                    token: user.pushtoken,
                    data: JSON.parse(req.body.data)
                };
                sendNotification(message)
                    .then(messageID => {
                        res.status(202).send(`Successfully sent message. MessageID: ${messageID}`);
                    })
                    .catch(error => {
                        res.status(400).send(error);
                    });
            });
    } else {
        res.status(400).send('Error: missing parameters in request');
    }
});

module.exports = router;
