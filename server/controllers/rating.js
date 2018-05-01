const Rating = require("../models").Rating;
const User = require("../models").User;
const Activity = require("../models").Activity;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.addRating = (req, res, next) => {
    const userId = req.user.id;
    let queryObj = null;
    let defaultObj = null;
    const {
        numOfStars,
        feedback,
        activityId,
        creatorId,
        parentId,
        replyToId
    } = req.body;
    if (numOfStars) {
        queryObj = {
            userId,
            activityId,
            creatorId,
        };
        defaultObj = {
            userId,
            activityId,
            creatorId,
            numOfStars,
            feedback,
            parentId: parentId || 0,
            replyToId: replyToId || 0
        };
    } else {
        queryObj = {
            userId,
            activityId,
            creatorId,
            parentId: parentId,
            replyToId: replyToId
        };
        defaultObj = {
            userId,
            feedback,
            activityId,
            creatorId,
            parentId: parentId,
            replyToId: replyToId
        };
    }

    Rating.findOrCreate({
        where: queryObj,
        defaults: defaultObj
    })
        .spread((rating, created) => {
            if (!created) {
                res.send({});
            } else {
                let data = rating.dataValues;
                let id = rating.dataValues.userId;
                let replyToId = rating.dataValues.replyToId;
                User.findById(id).then(user => {
                    data.username = user.dataValues.username;
                    data.imageurl = user.dataValues.imageurl;
                });
                if (replyToId !== 0) {
                    Rating.findById(replyToId).then(rating => {
                        if (rating) {
                            let userId = rating.userId;
                            User.findById(userId).then(user => {
                                data.whomToReply = user.username;
                                res.send(data);
                            });
                        }
                    });
                } else {
                    res.send(data);
                }
            }
        })
        .catch(e => next(e));
};

// { userId, numOfStars,feedback}

module.exports.fetchRatings = (req, res, next) => {
    const { activityId } = req.params;

    if (Number.isNaN(parseInt(activityId))) {
        res.send(["输入地址无效"]);
        res.end();
        return null;
    }
    let data = [];
    let users = [];
    let commentToReply = [];
    let whomToReply = [];
    let record = [];
    Rating.findAll({
        where: { activityId }
    }).then(result => {
        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                let item = result[i];
                data.push(item.dataValues);
                users.push(item.dataValues.userId);
                if (item.parentId !== item.replyToId) {
                    let replyToId = item.replyToId;
                    if (replyToId !== 0) {
                        commentToReply.push(replyToId);
                    }
                }
            }
            //commentToReply: Rating id: [ 112, 103, 137, 97, 100, 97, 97, 103, 102, 116, 104 ]
            User.findAll({
                where: {
                    id: {
                        [Op.or]: users
                    }
                }
            }).then(result => {
                if (result) {
                    for (let i = 0; i < data.length; i++) {
                        let userId = data[i].userId;
                        for (let j = 0; j < result.length; j++) {
                            let user = result[j].dataValues;
                            if (userId === user.id) {
                                data[i].username = user.username;
                                data[i].imageurl = user.imageurl;
                            }
                        }
                    }
                }

                // generate replyTo@ whom

                if (commentToReply.length > 0) {
                    Rating.findAll({
                        where: {
                            id: {
                                [Op.or]: commentToReply
                            }
                        }
                    }).then(parents => {
                        parents.forEach(parent => {
                            let whomId = parent.dataValues.userId;
                            if (whomToReply.indexOf(whomId) === -1) {
                                whomToReply.push(whomId);
                            }
                            // whomToReply:[ 43, 46, 44, 45, 35 ]

                            let commentId = parent.id;
                            record.push({
                                [commentId]: whomId
                            });
                        });

                        // rating id: userId(who creates a comment)
                        // [ { '97': 43 },
                        // { '100': 46 },
                        // { '102': 44 },
                        // { '103': 45 },
                        // { '104': 45 },
                        // { '112': 35 },
                        // { '116': 35 },
                        // { '137': 43 } ]

                        User.findAll({
                            where: {
                                id: {
                                    [Op.or]: whomToReply
                                }
                            }
                        }).then(users => {
                            if (users) {
                                for (let i = 0; i < users.length; i++) {
                                    let userId = users[i].dataValues.id;
                                    let username = users[i].dataValues.username;
                                    for (let j = 0; j < record.length; j++) {
                                        let value = Object.values(record[j])[0];
                                        if (userId === value) {
                                            let key = Object.keys(record[j])[0];
                                            record[j][key] = username;
                                        }
                                    }
                                }
                                for (let i = 0; i < record.length; i++) {
                                    let commentId = Object.keys(record[i])[0];
                                    let username = Object.values(record[i])[0];
                                    for (let j = 0; j < data.length; j++) {
                                        if (data[j].replyToId === +commentId) {
                                            data[j].whomToReply = username;
                                        }
                                    }
                                }
                                res.send(data);
                            }
                        });
                    });
                } else {
                    // console.log("!!!!!", data)
                    res.send(data);
                }
            });
        } else {
            res.send([]);
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
    Rating.count({
        where: {
            activityId,
            parentId: 0,
            replyToId: 0
        }
    })
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