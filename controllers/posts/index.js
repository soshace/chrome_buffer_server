'use strict';

var express = require('express'),
    router  = express.Router(),
    path    = require('path'),
    appDir  = path.dirname(require.main.filename);

router.get('/', function(req, res) {
    if (!req.user) {
        res.redirect('/auth');
    } else {
        res.sendFile(appDir + '/public/app.html');
    }
});

module.exports = router;