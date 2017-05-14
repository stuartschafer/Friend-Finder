// Establish npm packages
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var newFriend;

// Sets up the Express App and define the port
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// This is the inital array of people
var friendArray = [{
    name: "Rudy",
    photo: "https://images.pexels.com/photos/96938/pexels-photo-96938.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    scores: [
      "5", "5", "3", "5", "3", "2", "3", "5", "3", "1"
  ]
}, {
    name: "Jessica",
    photo: "https://images.pexels.com/photos/54632/cat-animal-eyes-grey-54632.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    scores: [
      "2", "2", "4", "4", "1", "1", "1", "4", "2", "1"
  ]
}, {
    name: "Rosetta",
    photo: "https://images.pexels.com/photos/54632/cat-animal-eyes-grey-54632.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    scores: [
      "4", "1", "5", "1", "2", "1", "5", "3", "5", "2"
  ]
}, {
    name: "Daniel",
    photo: "https://images.pexels.com/photos/54632/cat-animal-eyes-grey-54632.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    scores: [
      "4", "1", "3", "1", "4", "2", "2", "4", "4", "3"
  ]
},
{
    name: "Gary",
    photo: "https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    scores: [
      "5", "3", "2", "4", "3", "2", "5", "5", "3", "3"
  ]
}];

app.use(express.static(path.join(__dirname, "app")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "app", "public", "home.html"));
});

app.get("/results", function(req, res) {
    res.sendFile(path.join(__dirname, "app", "public", "results.html"));
});

app.get("/searchagain", function(req, res) {
    res.sendFile(path.join(__dirname, "app", "public", "beenheredonethat.html"));
});

app.get('/api', function (req, res) {
    return res.json(friendArray);
});

// This will post to the api
app.post("/api", function(req, res) {
    var newFriend = req.body;
    friendArray.push(newFriend);
    console.log(friendArray);
    res.json(newFriend);
});

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});