$(function() {

    var userID = "0";
    var profile;

    var firebaseUser;

    auth.onAuthStateChanged(user => {
        firebaseUser = user;
        if(user) {
            db.collection("Users").doc(user.uid).get().then((doc) => {
                if(doc.exists) {
                    profile = doc.data();
                    $(".page").hide();
                    $("#plant-page").show();
                    $("#navbar").show();
                    $("#user-button").text(profile.name);
                    $("#streak").text("Streak: " + profile.streak);
                    $("#remaining").text("Days until next leaf: " + Math.round(7 - (new Date().getTime() - new Date(profile.streakStart).getTime()) / (1000 * 3600 * 24)));
                }
            });
        }
        else if(!user){
            $("#navbar").hide();
            $(".page").hide();
            $("#login-page").show();
        }
    });

    $("#dropdown").hover(function() {
        if(firebaseUser) {
            $("#dropdown-content").show();
        }
    });

    $("#logout-button").click(function() {
        auth.signOut();
    });

    $("#home-button").click(function() {
        $(".page").hide();
        $("#plant-page").show();
    });

    $("#user-button").click(function() {
        $(".page").hide();
        $("#profile-page").show();
    });

    $("#goal-button").click(function() {
        $(".page").hide();
        $("#goal-page").show();
    });

});