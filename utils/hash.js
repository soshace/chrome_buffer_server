
// check out https://github.com/visionmedia/node-pwd

/**
 * Module dependencies.
 */

var crypto = require('crypto');

/**
 * Byte size.
 */

var len = 128;

/**
 * Iterations. ~300ms
 */

var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `password` and invoke `callback(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} salt salt
 * @param {Function} callback
 * @api public
 */

module.exports = function (password, salt, callback) {
    if (3 == arguments.length) {
        crypto.pbkdf2(password, salt, iterations, len, callback);
    } else {
        callback = salt;
        crypto.randomBytes(len, function(err, salt){
            if (err) return callback(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(password, salt, iterations, len, function(err, hash){
                if (err) return callback(err);
                callback(null, salt, hash);
            });
        });
    }
};