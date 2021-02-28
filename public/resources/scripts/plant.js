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
                    $(".plantImage img").attr("src", `resources/images/${profile.streak}leaves.png`);
                    $("#remaining").text("Days until next leaf: " + Math.round(7 - (new Date().getTime() - new Date(profile.streakStart).getTime()) / (1000 * 3600 * 24)));
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
            unit: $("#units").val(), 
            frequency: $("#frequency").val(), 
            progress: 0, 
            target: parseInt($("#target").val()),
        }

        userRef.update({
            goals: firebase.firestore.FieldValue.arrayUnion(goal)
        });

        loadGoals(goal, $("#current-goals").length + 1)

    });
    
    $("#btnUpdate").click(function() {
        console.log("test");
    });

});



function loadGoals(goal, index) {
    $("#current-goals").append(`<div id=${index}></div>`);
    $(`#${index}`).append(`<h3>${goal.name}</h3>`)
    $(`#${index}`).append(`<h3>Target: ${goal.target} ${goal.unit} ${goal.frequency}</h3>`)
    $(`#${index}`).append(`<h3>Current Progress: ${goal.progress} ${goal.unit} </h3> 
    <progress id="goal-progress-bar" value=${goal.progress} max=${goal.target}></progress> 
    <button id = "btnUpdate" name="btnUpdate"> Update </button>`)
}
