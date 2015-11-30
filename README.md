First you need to install npm packages:
```javascript
$ npm install
```

Then, for testing https sites you will also need to generate keys and certificate:
```javascript
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

Start it:
```javascript
$ node app.js
```

and go to http://127.0.0.1:8080/index.html (not http://localhost:8080/index.html). Chrome will ask you to accept the SSL certificate. Accept it.

Post list page is http://127.0.0.1:8080/

After that you can install the extension.