const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const path = require('path');

function getUsers() {
    return new Promise((resolve, reject) => {
        let dbPath = path.join(__dirname, '../db.json');
        jsonfile.readFile(dbPath)
            .then(resolve)
            .catch(reject);
    })
}

router.get('/', function(req, res, next) {
    getUsers()
        .then(users => {
            res.render('index', {users: users})
        })
        .catch(error => {
            console.error(error);
            response.status(400).send('Error getting users from database file');
        })
});

module.exports = router;
