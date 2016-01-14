var express = require('express'),
    session = require('express-session'),
    https = require('https'),
    http = require('http'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express(),
    fs = require('fs'),
    _ = require('underscore'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    fakeDB
    ;

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

mongoose.connect('127.0.0.1:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected to db!");
});

//model
var User = mongoose.model('User', { email: String, password: String });

app.set('view engine', 'jade');


//uses
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ //post request works fine
  extended: true
}));
//session init
app.use(session({
  secret: 'lamwdl2kl*mken@!njndjw()',
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    autoRemove: 'native'
  }),
  resave: false,
  saveUninitialized: false
}))


//session check

function loadUser(req, res, next) {
  if (req.session.user_id) {
    User.findById(req.session.user_id, function(user) {
      if (user) {
        req.currentUser = user;
        next();
      } else {
        res.redirect('/login');
      }
    });
  } else {
    res.redirect('/login');
  }
}








//routes

// app.use("/", express.static(__dirname + '/public'));
//
//
// app.get('/login', function (req, res) {
//     fakeDB = require('./posts.json');
//     res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
//     res.end(JSON.stringify(fakeDB, null, 4));
// });
app.get('/login', function(req, res){
   res.render('login', { title: 'Hey', message: 'Hello there!'});
});

app.post('/login', function(req, res){
  console.log(req.body);

  if (req.body.password && req.body.email) {
      User.find( { email: req.body.email }, function(err, users) {
        if (users.length) {

          if (users[0].password==req.body.password){
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
            res.end('login succefull');
          } else {
            res.writeHead(400, {'Content-Type': 'text/plain; charset=utf8'});
            res.end('Wrong password');
          }

        } else {
          res.writeHead(400, {'Content-Type': 'text/plain; charset=utf8'});
          res.end('Bad credentials');
        }
      });
  }


});

app.post('/user', function(req, res) {

  if (req.body.password && req.body.email) {
    //check if user already registered
    User.find( { email: req.body.email }, function(err, users) {
      if (users.length){
        res.writeHead(403, {'Content-Type': 'text/plain; charset=utf8'});
        res.end('Email already registered');
      } else {
        //create new user with pass and email
        var newUser = new User({ email: req.body.email, password: req.body.password });
        newUser.save(function (err, ok) {
          if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain; charset=utf8'});
                res.end('server error');
                console.log(err);
          } else {
            res.writeHead(201, {'Content-Type': 'text/plain; charset=utf8'});
            res.end('new user created');
            console.log('new user registered with email '+ ok.email+ ' and id ' + ok._id);
          }
        });
      };

    });
  } else {
    res.writeHead(400, {'Content-Type': 'text/plain; charset=utf8'});
    res.end('bad request');
  }
});

app.get('/posts', loadUser, function (req, res) {
    fakeDB = require('./posts.json');
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
    res.end(JSON.stringify(fakeDB, null, 4));
});

app.get('/posts/:id', loadUser, function (req, res) {
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

app.put('/posts', loadUser, [
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

app.delete('/posts/:id', loadUser, function (req, res) {
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
