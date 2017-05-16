
var friendArray = require("../data/allfriends");

module.exports = function(app) {

    // app.get("/api/tables", function(req, res) {
    //     res.json(tableData);
    // });

    app.get('/api', function (req, res) {
        return res.json(friendArray);
    });

    // app.post("/api/tables", function(req, res) {
    //     friendArray.push(req.body);
    // });

    app.post("/api", function(req, res) {
        var newFriend = req.body;
        friendArray.push(newFriend);
        console.log(friendArray);
        res.json(newFriend);
    });

}