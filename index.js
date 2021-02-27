const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const dom = require('jsdom');
//const $ = (require('jquery'))(dom.window);
//window.jQuery = window.$ = $;

var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
const firebaseConfig = {
    apiKey: "AIzaSyCoE1IX59LpgjMvLlmEpydUZZpc1X0Pum0",
    authDomain: "growth-spurt-6964f.firebaseapp.com",
    databaseURL: "https://growth-spurt-6964f-default-rtdb.firebaseio.com",
    projectId: "growth-spurt-6964f",
    storageBucket: "growth-spurt-6964f.appspot.com",
    messagingSenderId: "554230997796",
    appId: "1:554230997796:web:7fb9e3d67f79dba946c9b1",
    measurementId: "G-QG489YRBPY"
  };
firebase.initializeApp(firebaseConfig);

const server = http.createServer((req, res) => {

    //Get file path
    let filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filepath);

    let contentType = 'text/html';

    //Get correct content type
    switch(extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
    }

    //Send data to website
    fs.readFile(filepath, (err, content) => {
        if(err) {
            if(err.code = 'ENOENT') {

            }
        } else {
            res.writeHead(200, { 'content-type': contentType });
            res.end(content);
        }
    })

    
    //console.log(`Loaded file ${filepath}`);
})

server.listen(process.env.PORT || 3000);

