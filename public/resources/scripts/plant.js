$(".page").hide();

$(function() {


    var profile;

    var userRef;

    var firebaseUser;

    auth.onAuthStateChanged(user => {
        firebaseUser = user;
        if(user) {
            userRef = db.collection("Users").doc(user.uid);
            userRef.get().then((doc) => {
                if(doc.exists) {
                    profile = doc.data();
                    $("#current-goals").empty();
                    profile.goals.forEach(loadGoals)
                    $(".page").hide();
                    $("#navbar").show();
                    $("#user-button").text(profile.name);
                    $("#streak").text("Leaves: " + profile.streak);
                    $(".plantImage img").attr("src", `resources/images/${profile.streak}leaves${profile.perfectWeek ? "" : "Brown"}.png`);
                    $("#remaining").text(`Days until next leaf: ${(profile.perfectWeek ? 8 : 15) - (new Date().getDay() == 0 ? 7 : new Date.getDay()) }`);
                    $("#plant-page").show();
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

    $("#dropdown").mouseleave(function() {
        $("#dropdown-content").hide();
    })

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

    $("#btnSaveGoal").click(function() {

        goal = {
            name: $("#goal-name").val(),
            unit: $("#goal-unit").val(), 
            frequency: "week", 
            current: 0, 
            target: parseInt($("#goal-amount").val())
        }

        userRef.update({
            goals: firebase.firestore.FieldValue.arrayUnion(goal)
        });

        loadGoals(goal, $("#current-goals").length + 1)

    });

});


function loadGoals(goal, index) {
    $("#current-goals").append(`<div id=${index}></div>`);
    $(`#${index}`).append(`<h3>${goal.name}</h3>`)
    $(`#${index}`).append(`<h3>Target: ${goal.target} ${goal.unit} ${goal.frequency}</h3>`)

}