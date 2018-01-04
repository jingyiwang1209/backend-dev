const passportService = require("../middleware/passport");
const passport = require("passport");

const signupController = require("../controllers/authenticate").signup;
const loginController = require("../controllers/authenticate").login;
const addActivity = require("../controllers/activity").addActivity;
const addDemand = require("../controllers/demand").addDemand;

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });


module.exports = app => {
    app.post("/api/signup", signupController);
    app.post("/api/login", requireLogin, loginController);
    app.post("/api/addActivity", requireAuth, addActivity);
    app.post("/api/addDemand", requireAuth, addDemand);
};