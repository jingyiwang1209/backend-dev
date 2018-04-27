const User = require("../models").User;
const Activity = require("../models").Activity;
const Rating = require("../models").Rating;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.fetchComments = (req, res, next) => {
    let creatorId;
    // 0 means the person itself is reviewing his/ her story
    if (+req.params.userId !== 0) {
        if (Number.isNaN(parseInt(req.params.userId))) {
            res.send(["输入地址无效"]);
            res.end();
            return null;
        } else {
            creatorId = req.params.userId;
        }
    } else {
        creatorId = req.user.id;
    }

    let users = [];
    let activities = [];
    Rating.findAndCountAll({
        where: {
            creatorId,
            parentId: 0,
            replyToId: 0
        }
    }).then(result => {
        // console.log("Result", result)
        // { count: 0, rows: [] }
        if (result.count === 0) {
            res.send(["目前还没有评论"]);
        } else {
            let data = [];
            let total = 0;
            result.rows.forEach(item => {
                users.push(item.dataValues.userId);
                activities.push(item.dataValues.activityId);
                total += item.numOfStars;
                data.push(item.dataValues);
            });
            let average = Math.floor(total / result.count * 100) / 100;
            data[0].average = average;
            data[0].count = result.count;

            User.findAll({
                where: {
                    id: {
                        [Op.or]: users
                    }
                }
            }).then(users => {
                if (users) {
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < users.length; j++) {
                            if (data[i].userId === users[j].dataValues.id) {
                                data[i].username = users[j].dataValues.username;
                                data[i].imageurl = users[j].dataValues.imageurl;
                            }
                        }
                    }
                }
                Activity.findAll({
                    where: {
                        id: {
                            [Op.or]: activities
                        }
                    }
                }).then(activities => {
                    if (activities) {
                        for (let i = 0; i < data.length; i++) {
                            for (let j = 0; j < activities.length; j++) {
                                if (
                                    data[i].activityId ===
                                    activities[j].dataValues.id
                                ) {
                                    data[i].activityName =
                                        activities[j].dataValues.theme;
                                }
                            }
                        }

                    }
                    res.send(data);
                });
            });
        }
    });
};

module.exports.fetchUser = (req, res, next) => {
    let userId;
    // 0 means the person itself is reviewing his/ her file
    if (+req.params.userId !== 0) {
        userId = req.params.userId;
    } else {
        userId = req.user.id;
    }

    User.findOne({
        where: {
            id: userId
        },
        attributes: [
            "id",
            "mail",
            "username",
            "sex",
            "age",
            "city",
            "yearOfLiving",
            "school",
            "occupation",
            "language",
            "bio",
            "imageurl"
        ]
    })
        .then(user => {
            if (!user) {
                res.send({ warning: "该用户不存在" });
                res.end();
                return null;
            } else {
                console.log("userbasic", user.dataValues);
                res.send(user.dataValues);
            }
        })
        .catch(e => next(e));
};