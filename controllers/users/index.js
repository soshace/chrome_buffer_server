'use strict';

/*
    Router which handles user auth, i.e.
    - registration
    - login
    - logout
 */

var express  = require('express'),
    router   = express.Router(),
    User     = require('mongoose').model('user'),
    passport = require('passport'),
    path     = require('path'),
    _        = require('underscore'),
    appDir   = path.dirname(require.main.filename);


router.use(['/register', '/login'], function (req, res, next) {
    if (_.isEmpty(req.body.email) || _.isEmpty(req.body.password)) {
        return res.status(409).send('Username or password is empty');
    } else {
        next();
    }
});


router.post('/register', function(req, res, next) {
    var user = new User({ username: req.body.email, password: req.body.password });

    user.save(function(err) {
        if (err) { return next(err); }
        req.login(user, function(err) {
            if (err) { return next(err); }
            res.sendStatus(200);
        });
    });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', { session: true }, function(err, user, info) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.

        if (err) { return next(err); }
        // no such user or password is incorrect
        if (!user) { return res.sendStatus(401); }

        req.login(user, function(err) {
            if (err) { return next(err); }
            res.sendStatus(200);
        });
    })(req, res, next);
});

router.post('/logout', function(req, res) {
    req.logout();
    res.sendStatus(200);
});

router.get('/', function(req, res) {
    if (!req.user) {
        return res.sendFile(appDir + '/public/app.html');
    } else {
        return res.redirect('/posts');
    }
});

// todo: remove this when stable
router.get('/check', function(req, res) {
    if (req.user) {
        res.send('User is ' + req.user.username);
    } else {
        res.send('User is not logged in');
    }
    res.end();
});

module.exports = router;