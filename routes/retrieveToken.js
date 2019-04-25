const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const path = require('path');

function verifyRequest(body) {
    return body.hasOwnProperty('pushtoken') && body.hasOwnProperty('token') && body.hasOwnProperty('username');
}


function saveUsers(users) {
    return new Promise((resolve, reject) => {
        let dbPath = path.join(__dirname, '../db.json');
        jsonfile.writeFile(dbPath, users)
            .then(resolve)
            .catch(reject)
    })
}

function savePushToken(username, token, pushtoken) {
    return new Promise((resolve, reject) => {
        let dbPath = path.join(__dirname, '../db.json');
        jsonfile.readFile(dbPath)
            .then(users => {
                let userIndex = users.findIndex(eachUser => eachUser.username === username && eachUser.token === token);
                if (userIndex === -1) return reject('User not found');
                users[userIndex]['pushtoken'] = pushtoken;
                saveUsers(users).then(resolve).catch(reject);
            })
            .catch(error => {
                reject('Error opening database file: ', error);
            });
    })
}

router.post('/', (request, response) => {
    if (!verifyRequest(request.body)) return response.status(400).send();
    console.log("Retrieved token: ", request.body.pushtoken);
    savePushToken(request.body.username, request.body.token, request.body.pushtoken)
        .then(user => {
            response.status(202).send('Successfully saved push token');
        })
        .catch(error => {
            console.error(error);
            response.status(400).send('Error saving user');
        })
});

module.exports = router;