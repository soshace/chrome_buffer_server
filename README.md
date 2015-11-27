To run server just type

```javascript
$ npm install
```

```javascript
$ node app.js
```

For testing https sites you will also need to generate keys and certificate:
```javascript
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```