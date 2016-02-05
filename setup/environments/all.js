'use strict';

/**
 * Module dependencies.
 */
var config         = require('nconf');

var express        = require('express');
var passport       = require('passport');
var rootDir        = process.env.PWD;

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// end of dependencies.

module.exports = function() {
    this.use(express.static('public'));
    this.use(cookieParser());
    this.use(bodyParser());
    this.use(session({
        secret: 'SECRET',
        cookie: {
            httpOnly: true
            //, secure: true // set for httpS cookie transfer only
        }
    }));
    this.use(passport.initialize());
    this.use(passport.session());

    this.use(require('../../controllers'));
};
