// Establish npm packages
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var newFriend;

// Sets up the Express App and define the port
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);

// app.use(express.static(path.join(__dirname, "app")));

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});