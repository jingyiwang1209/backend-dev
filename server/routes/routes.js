const cors = require("cors");

const passportService = require("../services/passport");
const passport = require("passport");

const signupController = require("../controllers/authenticate").signup;
const loginController = require("../controllers/authenticate").login;
const addActivity = require("../controllers/activity").addActivity;

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

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
    app.post("/api/login", requireLogin, loginController);
    app.post("/api/addActivity", requireAuth, addActivity);
};