window.onload = function() {

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

    const btnSaveGoal = document.getElementById('btnSaveGoal');

    btnSaveGoal.addEventListener('click', e =>{
        
        const title = document.getElementsByTagName('goalTitle');
        db.collection("Goals").doc(user.uid).set({
            name: title
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

    });

};