'use strict';

var config         = require('nconf');
var log            = require('winston');

var mongoose       = require('mongoose');
var requireTree    = require('require-tree');
var models         = requireTree('../../models/');


// @todo: remove log strings when stable
module.exports = function(done) {

    mongoose.connection.on('open', function() {
        //log.info('Connected to mongodb server!'.green);
        return done();
    });

    mongoose.connection.on('error', function(err) {
        //log.error('Could not connect to mongodb server!');
        //log.error(err.message);
        return done(err);
    });

    try {
        mongoose.connect('mongodb://localhost/test');
        //log.info('Started connection on ' + (config.get('mongoose:db')).cyan + ', waiting for it to open...'.grey);
    } catch (err) {
        //log.error(('Setting up failed to connect to ' + config.get('mongoose:db')).red, err.message);
        done(err);
    }

};