var friendArray = require("../data/allfriends");

module.exports = function(app) {

    // This will post (add) to the new array
    app.post("/api", function(req, res) {
        var newFriend = req.body;
        friendArray.push(newFriend);
        res.json(newFriend);
    });

}