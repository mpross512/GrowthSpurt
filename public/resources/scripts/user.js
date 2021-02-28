window.onload = function() {
    const firebaseConfig = {
        apiKey: "AIzaSyCoE1IX59LpgjMvLlmEpydUZZpc1X0Pum0",
        authDomain: "growth-spurt-6964f.firebaseapp.com",
        databaseURL: "https://growth-spurt-6964f-default-rtdb.firebaseio.com",
        projectId: "growth-spurt-6964f",
        storageBucket: "growth-spurt-6964f.appspot.com",
        messagingSenderId: "554230997796",
        appId: "1:554230997796:web:7fb9e3d67f79dba946c9b1",
        measurementId: "G-QG489YRBPY"
    }

    
    firebase.initializeApp(firebaseConfig);
//////////////////////////////////////////////////////
    const btnLogout = document.getElementById('btnLogout');

    btnLogout.addEventListener('click', e =>{
        auth.signOut();
        auth.onAuthStateChanged(firebaseUser => {
            if(!firebaseUser){
            window.location.replace('login.html');
            console.log('not logged in');
            }
        })
    })
///////////////////////////////////////////////////////
var db = firebase.firestore();
const title = document.getElementsByTagName('goalTitle');
db.collection("Goals").doc(firebaseUser.uid).set({
    name: title
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});


};