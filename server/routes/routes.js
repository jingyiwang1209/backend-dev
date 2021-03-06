const passportService = require("../middleware/passport");
const passport = require("passport");
const signupController = require("../controllers/authenticate").signup;
const completeUserProfile = require("../controllers/authenticate")
    .completeUserProfile;
const verifySignupEmail = require("../controllers/authenticate")
    .verifySignupEmail;
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

const fetchUserWishes = require("../controllers/wish").fetchUserWishes;
const fetchWishForEditting = require("../controllers/wish")
    .fetchWishForEditting;
const updateUserWish = require("../controllers/wish").updateUserWish;
const deleteUserWish = require("../controllers/wish").deleteUserWish;

const fetchUser = require("../controllers/user").fetchUser;
const fetchComments = require("../controllers/user").fetchComments;
const fetchUserActivities = require("../controllers/activity")
    .fetchUserActivities;
const fetchActivityForEditting = require("../controllers/activity")
    .fetchActivityForEditting;
const updateUserActivity = require("../controllers/activity")
    .updateUserActivity;
const deleteUserActivity = require("../controllers/activity")
    .deleteUserActivity;
const fetchUserFavorites = require("../controllers/favorite")
    .fetchUserFavorites;
const deleteUserFavorite = require("../controllers/favorite")
    .deleteUserFavorite;

const verifyYourFev = require("../controllers/activity").verifyYourFev;

const addRating = require("../controllers/rating").addRating;
const fetchRatings = require("../controllers/rating").fetchRatings;
const fetchRatingSummary = require("../controllers/rating").fetchRatingSummary;
const fetchSearchData = require("../controllers/search").fetchSearchData;

const sendMessage = require("../controllers/message").sendMessage;
const fetchMyMessages = require("../controllers/message").fetchMyMessages
const markAsRead = require("../controllers/message").markAsRead

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

module.exports = app => {
    app.post("/api/signup", signupController);
    app.post("/api/completeUserProfile", requireAuth, completeUserProfile);
    app.post("/api/login", requireLogin, loginController);
    app.post("/api/updateBasicInfo", requireAuth, updateBasic);
    app.get("/api/user/:userId", requireAuth, fetchUser);
    app.get("/api/comments/:userId", requireAuth, fetchComments);

    app.get("/api/activities/:userId", requireAuth, fetchUserActivities);
    app.get(
        "/api/editActivity/:activityId",
        requireAuth,
        fetchActivityForEditting
    );
    app.post(
        "/api/updateUserActivity/:activityId",
        requireAuth,
        updateUserActivity
    );
    app.put(
        "/api/deleteUserActivity/:activityId",
        requireAuth,
        deleteUserActivity
    );
    app.get("/api/fetchUserFavorites", requireAuth, fetchUserFavorites);
    app.put("/api/deleteUserFavorite/:favId", requireAuth, deleteUserFavorite);

    app.get("/api/verifyYourFav/:activityId", requireAuth, verifyYourFev);

    app.get("/api/wishes/:userId", requireAuth, fetchUserWishes);
    app.get("/api/editWish/:wishId", requireAuth, fetchWishForEditting);
    app.post("/api/updateUserWish/:wishId", requireAuth, updateUserWish);
    app.put("/api/deleteUserWish/:wishId", requireAuth, deleteUserWish);

    app.post("/api/addWish", requireAuth, addWish);
    app.get("/api/fetchWish", requireAuth, fetchWish);
    app.post("/api/addActivity", requireAuth, addActivity);
    app.get("/api/fetchActivity/:lastId", requireAuth, fetchActivity);
    app.post("/api/clickLikes/:activityId", requireAuth, clickLikes);
    app.get("/api/activity/:activityId", requireAuth, fetchOneActivity);
    app.get("/api/wish/:wishId", requireAuth, fetchOneWish);

    app.post("/api/addRating", requireAuth, addRating);
    app.get("/api/fetchRatings/:activityId", requireAuth, fetchRatings);
    app.get(
        "/api/fetchRatingSummary/:activityId",
        requireAuth,
        fetchRatingSummary
    );
    app.get("/api/searchData?:query", requireAuth, fetchSearchData);
    app.post("/api/sendWishLike/:wishId", requireAuth, wishLikes);

    app.post("/api/sendMessage", requireAuth, sendMessage);
    app.get("/api/fetchMyMessages", requireAuth, fetchMyMessages)
    app.post("/api/markAsRead", requireAuth, markAsRead)
};