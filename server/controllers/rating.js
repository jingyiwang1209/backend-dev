const Rating = require("../models").Rating;
const User = require("../models").User;
const Activity = require("../models").Activity;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.addRating = (req, res, next) => {
    const userId = req.user.id;
    const { numOfStars, feedback, activityId, creatorId } = req.body;
    Rating.findOrCreate({
        where: {
            userId,
            activityId
        },
        defaults: {
            numOfStars,
            feedback,
            activityId,
            creatorId
        }
    })
        .spread((rating, created) => {
            if (!created) {
                res.send({});
            } else {
                res.send({
                    userId,
                    numOfStars,
                    feedback,
                    activityId,
                    creatorId
                });
            }
        })
        .catch(e => next(e));
};

// { userId, numOfStars,feedback}

module.exports.fetchRatings = (req, res, next) => {
    const { activityId } = req.params;
    console.log(activityId)
    if (Number.isNaN(parseInt(activityId))) {
        res.send(["输入地址无效"]);
        res.end();
        return null;
    }
    let data = [];
    let users = [];
    Rating.findAll({
        where: { activityId },
        attributes: [
            "userId",
            "numOfStars",
            "feedback",
            "activityId",
            "createdAt"
        ]
    }).then(result => {
        if (result.length > 0) {
            console.log(result)
            for (var i = 0; i < result.length; i++) {
                let item = result[i];
                data.push(item.dataValues);
                users.push(item.dataValues.userId);
            }
            User.findAll({
                where: {
                    id: {
                        [Op.or]: users
                    }
                }
            }).then(result => {
                if (result) {
                    result.forEach((user, index) => {
                        data[index].username = user.dataValues.username;
                        data[index].imageurl = user.dataValues.imageurl;
                    });
                }
                // console.log("Data", data);
                res.send(data);
            });
        }
    });
};

module.exports.fetchRatingSummary = (req, res, next) => {
    const { activityId } = req.params;
    if (Number.isNaN(parseInt(activityId))) {
        res.send(["输入地址无效"]);
        res.end();
        return null;
    }
    const statement = {};
    Rating.count({ where: { activityId } })
        .then(denominator => {
            statement["numOfRater"] = denominator;
            return denominator;
        })
        .then(denominator => {
            Rating.sum("numOfStars", { where: { activityId } })
                .then(nomerator => {
                    if (denominator == 0) {
                        statement["averageScore"] = 0;
                    } else {
                        statement["averageScore"] =
                            Math.floor(nomerator / denominator * 10) / 10;
                    }
                })
                .then(() => {
                    res.send(statement);
                });
        });
};