'use strict';

var mongoose = require('mongoose');
var hash = require('../utils/hash');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    salt: String,
    hash: String
});

UserSchema.statics.isValidUserPassword = function(email, password, done) {
    this.findOne({ username: email }, function(err, user){
        if(err) { return done(err); }
        if(!user) { return done(null, false, { message : 'Incorrect email.' }); }
        hash(password, user.salt, function(err, hash){
            if(err) { return done(err); }
            if(hash == user.hash) { return done(null, user); }
            done(null, false, {
                message : 'Incorrect password'
            });
        });
    });
};

module.exports = mongoose.model('user', UserSchema);