'use strict';

/**
 * Module dependencies.
 */
var config         = require('nconf');

var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var mongoose       = require('mongoose');
var User           = mongoose.model('user');

// end of dependencies.

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(username, password, done){
        User.findOne({ username: username }, function(err, user) {
            if (err) { return err; }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user);
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
            if (err) { return done(err); }
            done(null, user);
        });
    });
};