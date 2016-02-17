'use strict';

var express  = require('express'),
    router   = express.Router(),
    _        = require('underscore');

router.get('/folders', function (req, res) {
    if (!req.user) { return res.sendStatus(401); }

    var fakeDB = require('../../posts.json'),
        currentUserPosts,
        currentUserFolders;

    currentUserPosts = _.filter(fakeDB, function(bookmark) {
        // because req.user._id is an object
        return bookmark.user_id === req.user._id.toString();
    });

    currentUserFolders = _.reduce(currentUserPosts, function(result, bookmark) {
        if (bookmark.folder) { result.push(bookmark.folder); }
        return _.uniq(result);
    }, []);

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf8' });
    res.end(JSON.stringify(currentUserFolders, null, 4));
});

module.exports = router;