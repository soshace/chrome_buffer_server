Network for professionals [Soshace](https://soshace.com)

A backend for Chrome Extension for sharing posts
------------------------------------------------
#### To install server part please follow next instructions:

*This installation guide is for Mac OS X.*

Firstly, it's needed to install [`brew`](http://brew.sh/) package manager. Please enter in terminal following command:
```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then [`MongoDB`](https://www.mongodb.org/) should be installed by `brew`:
```sh
brew install mongodb
```

`MongoDB` should be started. The easiest way is to start mongo daemon on separate terminal tab:
```sh
sudo mongod
```

Please leave this tab opened and check mongo db instance started. Please type `mongo` on another tab:
```sh
mongo
```

One should see empty line with `>` where queries for `MongoDB` can be inserted.

Next [`node.js`](https://nodejs.org/en/) should be installed by `brew`:
```sh
brew install node
```

Command above will install [`npm`](https://www.npmjs.com/package/npm) as well. One could check versions of installed `node.js` and `npm` to verify installation by typing following commands:
```sh
node -v
npm -v
```

Now all global dependencies are installed. Let's install local packages for the project.

Please go to the project's folder and install npm packages:
```javascript
$ npm install
```

Then please generate keys and certificate for using https (or leave generated before):
```javascript
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

*Also there are valid `key.pem` and `cert.pem` files under `keys` folder for testing purposes only*

Start it:
```javascript
$ node app.js
```

Since server uses authentication `https` is used by default.

Please go to [`https://127.0.0.1:8081/`](https://127.0.0.1:8081/) (not `https://localhost:8081/`).

Chrome will ask you to accept the SSL certificate. Accept it.

One should see authentication page.

After that you can install the extension.
