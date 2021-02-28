$(function() {

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
    var database = firebase.firestore();

    var userID = "0";
    var profile;

    firebase.auth().onAuthStateChanged(user => {
        if(user) {

            database.collection("Users").doc(user.uid).get().then((doc) => {
                if(doc.exists) {
                    profile = doc.data();
                    console.log(profile.name);
                    $("#user").text(profile.name);
                    $("#streak").text("Streak: " + profile.streak);
                }
            });
            
            
            
        }
        else if(!user){
            console.log('not logged in');
            window.location.replace('login.html');
        }
    });
});