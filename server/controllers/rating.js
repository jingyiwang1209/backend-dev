const Rating = require("../models").Rating;
const User = require("../models").User;
const Activity = require("../models").Activity;
// data: {numOfStars: 3, feedback: "ilove", activityId: 1}
// One person only sends one time.
module.exports.addRating = (req, res, next) => {
    const userId = req.user.id;
    const { numOfStars, feedback, activityId } = req.body;

    Rating.findOrCreate({
        where: {
            userId,
            activityId
        },
        defaults: {
            numOfStars,
            feedback,
            activityId
        }
    }).spread((rating, created) => {
        if (!created) {
            res.send({});
        } else {
            res.send({ userId, numOfStars, feedback, activityId });
        }
    });
};

// { userId, numOfStars,feedback}

module.exports.fetchRatings = (req, res, next) => {
    const activityId = req.params.activityId;
    const data = [];
    Rating.findAll({
        where: { activityId },
        attributes: ["userId", "numOfStars", "feedback", "activityId"]
    })
        .then(result => {
            for (var i = 0; i < result.length; i++) {
                data.push(result[i].dataValues);
            }
        })
        .then(() => {
            // data [ { userId: 6, numOfStars: 4, feedback: 'sdaf', activityId:xx } ]
            // if not found then just return []
            res.send(data);
        });
};

module.exports.fetchRatingSummary = (req, res, next) => {
    const activityId = req.params.activityId;
    const statement = {};
    Rating.count({ where: {activityId} })
        .then(denominator => {
            statement["numOfRater"] = denominator;
            return denominator;
        })
        .then(denominator => {
            Rating.sum('numOfStars', { where: { activityId }})
                .then(nomerator => {
                    if (denominator == 0) {
                        statement["averageScore"] = 0;
                    } else {
                        statement["averageScore"] = Math.floor((nomerator / denominator) * 10) / 10;
                    }
                })
                .then(() => {
                    res.send(statement);
                });
        });
};