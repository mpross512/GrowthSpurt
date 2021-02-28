
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
    };
    
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    

//Get elements
const loginDiv = document.getElementById('login');
const signupDiv = document.getElementById('signup');
const txtName = document.getElementById('txtName');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const btnSignUpPage = document.getElementById('btnSignUpPage');
var newUser = false;
var name;

btnLogin.addEventListener('click', e => {
    //Get email and pass
    const email = loginEmail.value;
    const pass = loginPassword.value;
    const auth = firebase.auth();

    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => alert("you do not have an account\nplease use the sign up button"));

});

btnSignUp.addEventListener('click', e =>{
    //Get email and pass
    //TODO: Check 4 real email
    name = txtName.value;
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    newUser = true;

    //Sign in
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

    

    //var promise2 = auth.signInWithEmailAndPassword(email, pass);
    //promise2.catch(e => console.log(e.message));

    

});

btnSignUpPage.addEventListener('click', e => {
    loginDiv.classList.add("hide");
    signupDiv.classList.remove("hide");
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
        console.log(`logged in ${newUser}`);
        if(newUser) {
            db.collection("Users").doc(firebaseUser.uid).set({
                name: name,
                streak: 0,
                leaves: 0,
                streakStart: new Date().toISOString()
            })
            .then(() => {
                console.log("Document successfully written!");
                window.location.replace('index.html')
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        } else {
        }
    }
    else{
        console.log('not logged in');
    }
});
};