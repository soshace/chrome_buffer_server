var express = require('express'),
    https = require('https'),
    http = require('http'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express(),
    fs = require('fs'),
    _ = require('underscore'),
    fakeDB
    ;

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
app.use(morgan('combined'));

app.use("/", express.static(__dirname + '/public'));

app.get('/posts', function (req, res) {
    fakeDB = require('./posts.json');
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
    res.end(JSON.stringify(fakeDB, null, 4));
});

app.get('/posts/:id', function (req, res) {
    var user,
        id = parseInt(req.params.id)
        ;
    fakeDB = require('./posts.json');

    user = _.findWhere(fakeDB, {id: id});
    if (user) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
        res.end(JSON.stringify(user, null, 4));
    } else {
        res.status(404).send('Not found');
    }
});

app.put('/posts', [
    bodyParser.json(),
    function (req, res) {
        var last, newPost;

        fakeDB = require('./posts.json');
        last = _.max(fakeDB, function (obj) {
            return obj.id
        });
        newPost = req.body;
        newPost.id = last.id + 1;
        fakeDB.push(newPost);

        console.log(newPost);
        fs.writeFile('./posts.json', JSON.stringify(fakeDB, null, 4), function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
            res.end(JSON.stringify(fakeDB, null, 4));
        });
    }
]);

app.delete('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id);
    fakeDB = require('./posts.json');

    fakeDB = _.reject(fakeDB, {id: id});

    fs.writeFile('./posts.json', JSON.stringify(fakeDB, null, 4), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
        res.end(JSON.stringify(fakeDB, null, 4));
    });
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(8080);
httpsServer.listen(8081);
