const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const path = require('path');
const firebase = require('../firebaseAdmin').firebase();

/**
 * Verify that request contains username and password
 * @param {Object} body
 * @returns {boolean}
 */
function verifyRequest(body) {
    return (body.hasOwnProperty('username') && body.username !== '') && (body.hasOwnProperty('password') && body.password !== '')
}

/**
 * Retrieve user of username and password
 * @param {string} username
 * @param {string} password
 * @returns {Object} Represents the user
 */
function getUser(username, password) {
    return new Promise((resolve, reject) => {
        let dbPath = path.join(__dirname, '../db.json');
        jsonfile.readFile(dbPath)
            .then(users => {
                let user = users.find(eachUser => eachUser.username === username && eachUser.password === password);
                if (!user) return reject('User not found');
                resolve(user);
            })
            .catch(error => {
                reject('Error opening database file');
            });
    });
}

function sendVerificationCode(user) {
    return new Promise(((resolve, reject) => {
        let phoneNumber = user['phone'];

        //TODO: needs html tag for container THIS IS HOLDING US BACK
        let recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': function(response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
            'expired-callback': function() {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        });

        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                //TODO: this instance should be saved somehow
                // confirmationResult = confirmationResult;
            }).catch(function (error) {
            // Error; SMS not sent
            // ...
        });
    }))
}

router.post('/', function(req, res, next) {
    if (!verifyRequest(req.body)) return res.status(400).send();
    getUser(req.body.username, req.body.password)
        .then(user => {
            res.set('Content-Type', 'application/json');
            //TODO: trigger 2fa w/ firebase here
            sendVerificationCode()
                .then(() => {
                    res.status(202).send(user);
                })
                .catch(error => {
                    console.error(error);
                    res.status(400).send(error)
                });
        })
        .catch(error => {
            console.error(error);
            res.status(400).send(`Error getting user ${req.body.username} from database file`);
        });

});

module.exports = router;
