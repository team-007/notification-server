const express = require('express');
const router = express.Router();

function verifyRequest(body) {
    return body.hasOwnProperty('push_token') && body.hasOwnProperty('user_token') && body.hasOwnProperty('username');
}

router.post('/', (request, response) => {
    if (!verifyRequest(request.body)) return response.status(400).send();
    let content = request.body.push_token;
    console.log("Retrieved token: ", content);
    //TODO: Save Token to Given Location
    response.status(202).send(content);
});

module.exports = router;