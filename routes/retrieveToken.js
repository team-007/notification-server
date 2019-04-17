const express = require('express');
const router = express.Router();

function verifyRequest(body) {
    return body.hasOwnProperty('token');
}

router.post('/', (request, response) => {
    if (!verifyRequest(request.body)) response.status(400).send();
    let content = request.body.token
    //TODO: Save Token to Given Location
    response.status(202).send();
})