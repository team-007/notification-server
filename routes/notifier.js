const express = require('express');
const router = express.Router();

/**
 * Verifies that the necessary values fot Firebase Cloud Messaging are provided.
 * @param body
 * @returns {boolean}
 */
function verifyParameters(body) {
    //TODO:
    return true
}

router.post('/', function(req, res, next) {
    console.log(req.body);
    if (verifyParameters(req.body)) {
        //    TODO: make call to Firebase Cloud Messaging here
        res.status(202).send();
    } else {
        res.status(400).send()
    }
});

module.exports = router;
