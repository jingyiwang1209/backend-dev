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
            numOfStars
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
            feedback,
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
                            whomToReply.push(whomId);
                            let commentId = parent.id;
                            record.push({
                                [commentId]: whomId
                            });
                        });
                        // [ { '97': 43 }, { '100': 46 } ]

                        User.findAll({
                            where: {
                                id: {
                                    [Op.or]: whomToReply
                                }
                            }
                        }).then(users => {
                            let arr = [];
                            if (users) {
                                for (let i = 0; i < record.length; i++) {
                                    let key = Object.keys(record[i])[0];
                                    let value = Object.values(record[i])[0];

                                    for (let j = 0; j < users.length; j++) {
                                        if (users[j].dataValues.id === value) {
                                            users[j].dataValues.commentId = key;
                                            arr.push(users[j].dataValues);
                                        }
                                    }
                                }

                                for (let i = 0; i < data.length; i++) {
                                    let item = data[i];
                                    if (item.parentId !== item.replyToId) {
                                        for (let j = 0; j < arr.length; j++) {
                                            let user = arr[j];
                                            if (
                                                item.replyToId ===
                                                +user.commentId
                                            ) {
                                                data[i].whomToReply =
                                                    user.username;
                                            }
                                        }
                                    }
                                }
                            }
                            res.send(data);
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
    Rating.count({ where: {
        activityId,
        parentId:0,
        replyToId:0
        } })
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