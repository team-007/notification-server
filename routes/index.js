const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.status(400).send();
});

module.exports = router;
