window.onload = function() {
    var modal = document.getElementById('goalModal');
    var btn = document.getElementById('btnAddGoal');
    var span = document.getElementsByClassName('close')[0];

    btn.onclick = function(){
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    const btnLogout = document.getElementById('btnLogout');

    btnLogout.addEventListener('click', e =>{
        auth.signOut();
        auth.onAuthStateChanged(firebaseUser => {
            if(!firebaseUser){
            window.location.replace('login.html');
            console.log('not logged in');
            }
        });
    });

const btnSaveGoal = document.getElementById('btnSaveGoal');

btnSaveGoal.addEventListener('click', e =>{
    
});

};