const cors = require("cors");

const verifyToken = require("../middleware/verifyToken");
const signupController = require("../controllers/authenticate").signup;
const loginController = require("../controllers/authenticate").login;
const addActivity = require("../controllers/activity").addActivity;


const whitelist = ["http://localhost:3000", "http://45.55.12.226"];
const corsOptionsDelegate = function(req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

module.exports = app => {
    app.post("/api/signup", signupController);
    app.post("/api/login", loginController);
    app.get("/api/test", verifyToken, (req, res, next) => {
        res.send("This is a test for jwt!");
    });
    app.post('/api/addActivity/:userId', verifyToken, addActivity);
};