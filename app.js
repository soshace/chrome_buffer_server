'use strict';

var express = require('express'),
    https = require('https'),
    http = require('http'),
    //morgan = require('morgan'),
    app = express(),
    fs = require('fs'),

    config = require('nconf'),
    bootable = require('bootable'),
    bootableEnv = require('bootable-environment')
    ;

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

app = bootable(app);

//app.use(morgan('combined'));

// Setup initializers
app.phase(bootable.initializers('setup/initializers/'));

// Setup environments
app.phase(bootableEnv('setup/environments/', app));

// Boot app
app.boot(function(err) {
    if (err) throw err;

    var httpServer = http.createServer(app);
    var httpsServer = https.createServer(options, app);

    httpServer.listen(8080, function() {
        console.log('Express http listen port on 8080');
    });
    httpsServer.listen(8081, function() {
        console.log('Express https listen port on 8081');
    });
});
