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
                    if(profile.goals) {
                        profile.goals.forEach(loadGoals)
                    }
                    $(".page").hide();
                    $("#navbar").show();
                    $("#user-button").text(profile.name);
                    $("#streak").text("Leaves: " + profile.leaves);
                    $(".plantImage img").attr("src", `resources/images/${profile.leaves}leaves${profile.perfectWeek ? "" : "Brown"}.png`);
                    $("#remaining").text(`Days until next leaf: ${(profile.perfectWeek ? 8 : 15) - (new Date().getDay() == 0 ? 7 : new Date().getDay()) }`);
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

        loadGoals(goal, $("#current-goals").children().length)
        //updateGoals(goal, $("#current-goals").children().length + 1);
        
    });

    
    
    function loadGoals(goal, index) {
        console.log(index);
        console.log($("#current-goals").children().length);
        $("#current-goals").append(`<div id=${index}></div>`);
        $(`#${index}`).append(`<h3>${goal.name}</h3>`);
        $(`#${index}`).append(`<h3>Target: ${goal.target} ${goal.unit} ${goal.frequency}</h3>`);
        $(`#${index}`).append(`<h3 id="progressid">Current Progress: ${goal.progress} ${goal.unit} </h3> 
        <progress id="goal-progress-bar" value=${goal.progress} max=${goal.target}></progress>`);
        updateGoals(goal, index);
       
    }

    function updateGoals(goal, index){
        var button = document.createElement("BUTTON");
        button.innerHTML="Update";
        var input = document.createElement("input")
        input.type='number';
        input.id = 'addition'
        input.defaultValue = 0;
        input.min = 0;
        input.max = 69;
        input.classList.add('hide');
        var confirm = document.createElement("BUTTON");
        confirm.innerHTML="Confirm";
        confirm.classList.add('hide');

        $(`#${index}`).append(`<br></br>`, button, input, confirm);

        button.addEventListener('click', e=>{
            input.classList.remove('hide');
            confirm.classList.remove('hide');
        })

        confirm.addEventListener('click', e=>{
            const updateVal = document.getElementById('addition');
            var add = input.value;
            console.log(add);
            input.classList.add('hide');
            confirm.classList.add('hide');
            
            $(`#${index}`).empty();
           // $("#current-goals").append(`<div id=${index}></div>`);
            $(`#${index}`).append(`<h3>${goal.name}</h3>`);
            $(`#${index}`).append(`<h3>Target: ${goal.target} ${goal.unit} ${goal.frequency}</h3>`);
            $(`#${index}`).append(`<h3 id="progressid">Current Progress: ${add} ${goal.unit} </h3> 
            <progress id="goal-progress-bar" value=${add} max=${goal.target}></progress>`);
            $(`#${index}`).append(`<br></br>`, button, input, confirm);
            userRef.get().then((doc) => {
                var goals = doc.data().goals;
                console.log(index);
                goals[index].progress = add;
            userRef.update({
                goals: goals
            });

            
        });
        
    });

    }
    
   

    
    

});




