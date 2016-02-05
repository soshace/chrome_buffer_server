'use strict';

var express  = require('express'),
    router   = express.Router();

router.get('/email', function (req, res) {
    if (!req.user) {
        return res.sendStatus(401);
    } else {
        return res.send(req.user.username);
    }
});

module.exports = router;