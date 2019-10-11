const express = require('express');
const router = express.Router();

function verifyRequest(body) {
    return body.hasOwnProperty('code');
}

router.post('/', (request, response) => {
    if (!verifyRequest(request.body)) return response.status(400).send();

    let code = request.body.code;
//    TODO: use saved  confirmationResult instance here
    confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
    }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
    });
});

module.exports = router;