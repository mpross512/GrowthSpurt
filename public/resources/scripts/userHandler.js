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

var auth = firebase.auth();

var user = firebase.auth().currentUser;

function getUser() {
    return user;
}

function setUser(firebaseUser) {
    user = firebaseUser;
}