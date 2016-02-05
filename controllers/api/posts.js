'use strict';

var express  = require('express'),
    router   = express.Router(),
    fs       = require('fs'),
    _        = require('underscore');

router.get('/posts', function (req, res) {
    if (!req.user) { return res.sendStatus(401); }

    var fakeDB = require('../../posts.json'),
        postsForCurrentUser;

    postsForCurrentUser = _.filter(fakeDB, function(bookmark) {
        // because req.user._id is an object
        return bookmark.user_id === req.user._id.toString();
    });

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf8' });
    res.end(JSON.stringify(postsForCurrentUser, null, 4));
});

router.get('/posts/:id', function(req, res) {
    var user,
        id = parseInt(req.params.id),
        fakeDB = require('../../posts.json');

    user = _.findWhere(fakeDB, {id: id});
    if (user) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
        res.end(JSON.stringify(user, null, 4));
    } else {
        res.status(404).send('Not found');
    }
});


// todo: investigate why bodyParser.json[] was used before in `put`
router.put('/posts', function (req, res) {
    var last, newPost;

    var fakeDB = require('../../posts.json');
    last = _.max(fakeDB, function (obj) {
        return obj.id
    });
    newPost = req.body;
    newPost.id = last.id + 1;
    fakeDB.push(newPost);

    console.log(newPost);
    fs.writeFile('../../posts.json', JSON.stringify(fakeDB, null, 4), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
        res.end(JSON.stringify(fakeDB, null, 4));
    });
});

router.delete('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id),
        fakeDB = require('../../posts.json');

    fakeDB = _.reject(fakeDB, {id: id});

    fs.writeFile('../../posts.json', JSON.stringify(fakeDB, null, 4), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
        res.end(JSON.stringify(fakeDB, null, 4));
    });
});

module.exports = router;