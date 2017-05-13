// Establish npm packages
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App and define the port
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// This is the inital array of people
var people = [{
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
},
{
  name: "Gary",
  photo: "https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
  scores: [
      "5", "3", "2", "4", "3", "2", "5", "5", "3", "3"
  ]
}];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home2.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:people?", function(req, res) {
  var chosen = req.params.people;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < people.length; i++) {
      if (chosen === people[i].routeName) {
       return res.json(people[i]);
      }
    }
    return res.json(false);
  }
  return res.json(people);
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});