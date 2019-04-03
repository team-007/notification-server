const express = require('express');
const router = express.Router();

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
    let users = [
        {username: 'test', password: 'test', created: '01-01-2019'},
        {username: 'test1', password: 'test1', created: '01-02-2019'}];
    return users.find(user => user.username === username && user.password === password);
}

router.post('/', function(req, res, next) {
    if (!verifyRequest(req.body)) res.status(400).send();
    let user = getUser(req.body.username, req.body.password);
    res.set('Content-Type', 'application/json');
    res.status(202).send(user);
});

module.exports = router;
