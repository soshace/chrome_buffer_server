'use strict';

var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    if (!req.user) {
        return res.redirect('/auth');
    } else {
        return res.redirect('/posts');
    }
});

router.use('/auth', require('./users'));
router.use('/posts', require('./posts'));

router.use('/api', require('./api/posts'));
router.use('/api', require('./api/users'));
router.use('/api', require('./api/folders'));

module.exports = router;