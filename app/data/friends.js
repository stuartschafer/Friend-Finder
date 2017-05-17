$( document ).ready(function() {

    // This makes the person's name the user is matched with flash/blink
    function blinker() {
        $("#match").fadeOut(500);
        $("#match").fadeIn(500);
    }
    setInterval(blinker, 1000);

    var allFriends = {};
    var newFriend = {};
    $("#newSearch").hide();
    $("#imgMatch").hide();
    $(".returningMember").hide();

    // This is when the user clicks the submit button for the survey page
    $("#submit1").on("click", function() {
        var link = "";
        var answeredQuestions = 0;
        newFriend = {
            name: $("#icon_prefix_name").val(),
            photo: $("#icon_prefix_photo").val(),
            scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val()]
        }
        // This checks to make sure every question is answered and the link is valid
        for (var i = 0; i < 10; i++) {
            // This checks to make sure the link is valid
            if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#icon_prefix_photo").val())) {
                link = "valid";
            } else {
                alert("Sorry, but that is an invalid URL, please enter a valid link");
                break;
            }
            if (newFriend.scores[i] === null || newFriend.name === "" || newFriend.photo === "") {
                alert("Sorry, but you didn't answer a question.  Also make sure you entered your name and a link to a photo.");
                break;
            }
            answeredQuestions += 1;
        }
        
        // If all conditions are met, then this will run
        if (answeredQuestions === 10 && link === "valid") {
            $.post("/api", newFriend).done(function(data) {
                alert("Adding you to all the friends.  Welcome friend!  Now I'll search for someon e with similar tastes.");
                // This opens the results page to display the best search
                window.location = "results";
            });
        }
    });

    // This runs when the results page is loaded.  It loads once the user submits a survey.
    if (top.location.pathname === '/results')
    {
        getAllFriendsInfo();
    }

    // This loads all of the info for the existing friends from the api
    function getAllFriendsInfo () {
        $.get("/api", function(data) {
            allFriends = data;
            newFriend = data[(data.length - 1)];
            totalFriends = data.length;
            checkOtherFriendsScores();
        });
    }

    // This function will go through all of the friends in the api, and add a score to an array for each friend.
    // The lowest score in the array is the closest match to the user.
    function checkOtherFriendsScores() {
        var scoreArray = [];

        // This will go through every friend except the last one, since the user is the last person in allFriends
        for (var i = 0; i < (allFriends.length - 1); i++) {
            var diff = 0;
            // This calculates the difference of each question's score and adds the difference
            for (var j = 0; j < 10; j++) {
                diff += Math.abs(allFriends[i].scores[j] - newFriend.scores[j]);
            }
            // This pushes the total difference score into an array
            // The lowest score in the array is the person (allFriends[]) they are best matched with
            scoreArray.push(diff);
        }

        indexofSmallestNumber();

        // This will determine the position in the array of the lowest score.  That position is the closest match from the friend api.
        function indexofSmallestNumber() {
            var min = scoreArray[0];
            var minIndex = 0;
            for (var i = 0; i < scoreArray.length; i++) {
                if (scoreArray[i] < min) {
                    minIndex = i;
                    min = scoreArray[i];
                }
            }
            console.log(minIndex);
            $("#match").text(allFriends[minIndex].name);
            $("#userName").text(newFriend.name);
            $("#uniqueID").text(allFriends.length);
            $("#imgMatch").show();
            $("#imgMatch").attr("src", allFriends[minIndex].photo);
        }
    }

    // THIS ONLY WORKS IF THE SERVER IS ALWAYS UP AND DOESN"T RESET.
    // If the user has visited the site before and filled out a survey, they are given an ID#.
    // This is the submit button on the Search Again page.  If the user enters the name and ID (position + 1) in the friend api,
    // then another button with show allowing them to search for closest matches.

    // This will show in the console in Chrome of exisiting users that will always be there
    // For testing purposes and to show that the functionality works.
    if (top.location.pathname === '/searchagain') {
        console.log("Rudy - 1, Jessica - 2, Rosetta - 3, Daniel - 4, Gary - 5, Bill - 6, Roxanne - 7");
    }

    $("#searchAgainSubmit").on("click", function() {
        $("#imgMatch").hide();
        $("#searchResult").hide();
        $.get("/api", function(data) {
            position = $("#icon_prefix_photo").val();
            userName = $("#icon_prefix_name").val();
            newPeopleSinceLast = data.length - position;
            newFriend = data[(position - 1)];

            // This checks to make sure it is an actual position in the array and not a blank entry
            if (position > data.length || position === "" || userName === "") {
                alert("Sorry, that does not register with an exisiting user.");
                return;
            }

            // This checks to make sure the name matches the existing user
            if ((newFriend.name).toLowerCase() === userName.toLowerCase()) {
                $("#welcome_back").text("Welcome back " + newFriend.name + "!");
                $(".returningMember").fadeIn("slow");
                $("#newPeeps").text(newPeopleSinceLast);
                $("#searchAgainSubmit").fadeOut();
                $("#submit").hide();
                $("#newSearch").show();
            } else {
                alert("Sorry, that does not register with an exisiting user.");
                return;
            }
        });
    });

    // This button only appears after the user has entered correct info for an exisiting user (name and ID#)
    // It will run a search for matches in the friends api
    $("#newSearch").on("click", function() {
        $.get("/api", function(data) {
            var scoreArray = [];
            var diff = 0;

            // This will go through every friend except the user's position
            for (var i = 0; i < (data.length); i++) {
                if (i != (position - 1)) {
                    
                    // This calculates the difference of each question's score and adds the difference
                    for (var j = 0; j < 10; j++) {
                        diff += Math.abs(data[i].scores[j] - newFriend.scores[j]);
                    }
                    
                    // This pushes the total difference score into an array
                    // The lowest score in the array is the person (allFriends[]) they are best matched with
                    scoreArray.push(diff);
                    diff = 0;
                // This is when it gets to the current user's position and will add 1000 to the array
                // To make sure they don't match with themself
                } else { scoreArray.push(1000);
                }
            }

            indexofSmallestNumber();

            // This runs through the array of numbers to check for the lowest score and what position it is.
            function indexofSmallestNumber() {
                var min = scoreArray[0];
                var minIndex = 0;
                for (var k = 0; k < scoreArray.length; k++) {
                    if (scoreArray[k] < min) {
                        minIndex = k;
                        min = scoreArray[k];
                    }
                }
                $("#searchAgainSubmit").show();
                $("#newSearch").hide();
                $("#searchResult").show();
                $("#searchResult").text("You are matched closest with " + data[minIndex].name);
                $("#imgMatch").show();
                $("#imgMatch").attr("src", data[minIndex].photo);
            }
        });
    });
});