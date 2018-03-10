const passportService = require("../middleware/passport");
const passport = require("passport");

const signupController = require("../controllers/authenticate").signup;
const verifySignupEmail = require("../controllers/authenticate").verifySignupEmail;
const updateBasic = require("../controllers/authenticate").updateBasic;


const loginController = require("../controllers/authenticate").login;
const addWish = require("../controllers/wish").addWish;
const fetchWish = require("../controllers/wish").fetchWish;
const wishLikes = require("../controllers/wish").wishLikes;

const addActivity = require("../controllers/activity").addActivity;
const fetchActivity = require("../controllers/activity").fetchActivity;
const clickLikes = require("../controllers/activity").clickLikes;
const fetchOneActivity = require("../controllers/activity").fetchOneActivity;
const fetchOneWish = require("../controllers/wish").fetchOneWish;

const fetchUser = require("../controllers/user").fetchUser;
const fetchUserActivities = require("../controllers/activity").fetchUserActivities;
const fetchActivityForEditting = require("../controllers/activity").fetchActivityForEditting;
const updateUserActivity = require("../controllers/activity").updateUserActivity;
const deleteUserActivity = require("../controllers/activity").deleteUserActivity
const fetchUserFavorites = require("../controllers/favorite").fetchUserFavorites


const addRating = require("../controllers/rating").addRating;
const fetchRatings = require("../controllers/rating").fetchRatings;
const fetchRatingSummary = require("../controllers/rating").fetchRatingSummary;
const fetchSearchData = require("../controllers/search").fetchSearchData;



const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

module.exports = app => {
    app.get("/api/verifySignupEmail?:query", verifySignupEmail);
    app.post("/api/signup", signupController);
    app.post("/api/login", requireLogin, loginController);
    app.post("/api/updateBasicInfo", requireAuth, updateBasic);
    app.get("/api/activities/:userId", fetchUserActivities);
    app.get("/api/editActivity/:activityId", requireAuth, fetchActivityForEditting);
    app.post("/api/updateUserActivity/:activityId", requireAuth, updateUserActivity);
    app.put("/api/deleteUserActivity/:activityId", requireAuth, deleteUserActivity);
    app.get("/api/fetchUserFavorites", requireAuth, fetchUserFavorites);

    app.post("/api/addWish", requireAuth, addWish);
    app.get("/api/fetchWish", fetchWish);
    app.post("/api/addActivity", requireAuth, addActivity);
    app.get("/api/fetchActivity", fetchActivity);
    app.post("/api/clickLikes/:activityId", requireAuth, clickLikes);
    app.get("/api/activity/:activityId", fetchOneActivity);
    app.get("/api/wish/:wishId", fetchOneWish);

    app.get("/api/user/:userId", fetchUser);
    app.post("/api/addRating", requireAuth, addRating);
    app.get("/api/fetchRatings/:activityId", fetchRatings);
    app.get("/api/fetchRatingSummary/:activityId", fetchRatingSummary);
    app.get("/api/searchData?:query", fetchSearchData);
    app.post("/api/sendWishLike/:wishId", requireAuth, wishLikes);
};