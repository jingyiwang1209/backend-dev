const Rating = require("../models").Rating;
const User = require("../models").User;

// data: {numOfStars: 3, feedback: "ilove", activityId: 1}
module.exports.addRating = (req, res, next) => {
    const userId = req.user.id;
    const { numOfStars, feedback, activityId } = req.body;
    Rating.findOrCreate({
        where: {
            userId,
        },
        defaults: {
            numOfStars,
            feedback,
            activityId
        }
    }).spread((rating, created) => {
        if (!created) {
            res.send("You' have already sent your rating");
        } else {
            res.send("Your rating has been sent successfully");
        }
    });
};