var express = require("express");
var path = require("path");

module.exports = function(app) {

    // This allows the js to be loaded
    app.use(express.static(path.join(__dirname, "/../")));

    // app.get("/", function(req, res) {
    //     res.sendFile(path.join(__dirname, "/../public/home.html"));
    // });

    app.get("/results", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/results.html"));
    });

    app.get("/searchagain", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/beenheredonethat.html"));
    });

    // This defaults to the home page if the user types in a bad webpage
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });

};