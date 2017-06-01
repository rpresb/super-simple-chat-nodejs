# Super Simple Chat

## Running Instructions

Check if you have [NodeJS](http://nodejs.org) installed.

Clone (or download) this repo
```
git clone git@github.com:rpresb/super-simple-chat-nodejs.git
```

Go to project's directory
```
cd super-simple-chat-nodejs
```

Install the npm packages
```
npm install mocha -g
npm install bower -g
npm install
```

Install frontend dependencies
```
cd frontend
bower install
cd ..
```

NOTE: If you are trying this through your network, edit the */frontend/app/scripts/app.js* file and change the *localhost* to your local IP address.

Start the server
```
npm start
```

You can run the tests (in another terminal window) with the server running
```
npm test
```

Open the browser and go to (http://localhost:3000/).

Enjoy!

## What you should know!

I have based on these two projects listed below:

* [angular-socketio-chat](https://github.com/krimple/angular-socketio-chat)
* [Testing-Socket.IO](https://github.com/liamks/Testing-Socket.IO)

