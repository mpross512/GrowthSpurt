$(function() {

    var userID = "0";
    var profile;

    auth.onAuthStateChanged(user => {
        if(user) {

            db.collection("Users").doc(user.uid).get().then((doc) => {
                if(doc.exists) {
                    profile = doc.data();
                    console.log(profile.name);
                    $("#user").text(profile.name);
                    $("#streak").text("Streak: " + profile.streak);
                    $("#remaining").text("Days until next leaf: " + Math.round(7 - (new Date().getTime() - new Date(profile.streakStart).getTime()) / (1000 * 3600 * 24)));
                }
            });
            
            
            
        }
        else if(!user){
            console.log('not logged in');
            window.location.replace('login.html');
        }
    });
});