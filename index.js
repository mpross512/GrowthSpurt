const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const cron = require('node-cron');

const firebase = require('firebase');
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

var db = firebase.firestore();

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

})

cron.schedule('* * 2 * * *', updateDailyGoals);
cron.schedule('* * 3 * * 1', updateWeeklyGoals);

server.listen(process.env.PORT || 3000);

module.exports.runDailyUpdate = function () {
    updateDailyGoals();
}

function updateDailyGoals() {
    db.collection("Users").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            docRef = db.collection("Users").doc(doc.id);
            var goals = doc.data().goals;
            var perfectWeek = doc.data().perfectWeek;
            if(goals) {
                for(var i = 0; i < goals.length; i++) {
                    if(goals[i].frequency == "daily") {
                        if(perfectWeek && goals[i].current < goals[i].target) {
                            perfectWeek = false;
                        }
                        goals[i].current = 0;
                    }
                }
            }
            docRef.update({
                perfectWeek: perfectWeek
            })
            if(goals) {
                docRef.update({
                    goals: goals
                })
            }
        });
    });
}

module.exports.runWeeklyUpdate = function() {
    updateWeeklyGoals();
}

function updateWeeklyGoals () {

    db.collection("Users").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            docRef = db.collection("Users").doc(doc.id);
            var goals = doc.data().goals;
            var perfectWeek = doc.data().perfectWeek;
            if(goals) {
                for(var i = 0; i < goals.length; i++) {
                    if(perfectWeek && goals[i].current < goals[i].target) {
                        perfectWeek = false;
                    }
                    goals[i].current = 0;
                }
            }
            if(perfectWeek && doc.data().leaves < 7) {
                docRef.update({
                    leaves: firebase.firestore.FieldValue.increment(1),
                    perfectWeek: true
                })
            } else if(!perfectWeek && doc.data().leaves > 0) {
                docRef.update({
                    leaves: firebase.firestore.FieldValue.increment(-1),
                    perfectWeek: true
                })
            }
            if(goals) {
                docRef.update({
                    goals: goals
                })
            }
        });
    });

}