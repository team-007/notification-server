const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const path = require('path');

function verifyRequest(body) {
    return body.hasOwnProperty('username') && body.hasOwnProperty('password');
}

function getUsers() {
    return new Promise((resolve, reject) => {
        let dbPath = path.join(__dirname, '../db.json');
        jsonfile.readFile(dbPath)
            .then(resolve)
            .catch(reject);
    })
}

function saveUsers(users) {
    return new Promise((resolve, reject) => {
        let dbPath = path.join(__dirname, '../db.json');
        jsonfile.writeFile(dbPath, users)
            .then(resolve)
            .catch(reject)
    })
}

router.post('/', (request, response) => {
    if (!verifyRequest(request.body)) return response.status(400).send();

    let newUser = {
        username: request.body.username,
        password: request.body.password,
        created: new Date().toString(),
        usertoken: new Date().getTime()
    };
    getUsers()
        .then(users =>{
            users.push(newUser);
            saveUsers(users)
                .then(() => {
                    response.status(202).send('User successfully created');
                })
                .catch(error => {
                    console.error(error);
                    response.status(400).send('Error saving user to database file');
                });
        })
        .catch(error => {
            console.error(error);
            response.status(400).send('Error getting users from database file');
        });
});

module.exports = router;