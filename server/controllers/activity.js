const Activity = require("../models").Activity;
const User = require("../models").User;
const ActivityLikes = require("../models").ActivityLikes;
const Rating = require("../models").Rating;
const Favorite = require("../models").Favorite;
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const moment = require("moment");
require("moment/locale/zh-cn.js");
moment.locale("zh-cn");

module.exports.verifyYourFev = (req, res, next) => {
    const userId = req.user.id;
    const { activityId } = req.params;
    if (Number.isNaN(parseInt(activityId))) {
        res.send(["输入地址无效"]);
        res.end();
        return null;
    }

    Favorite.findOne({
        where: {
            userId
        }
    }).then(fav => {
        if (!fav || fav.favorites.length === 0) {
            res.send(false);
        } else {
            if (fav.favorites.includes(+activityId)) {
                res.send(true);
            } else {
                res.send(false);
            }
        }
    });
};

module.exports.addActivity = (req, res, next) => {
    const {
        theme,
        location,
        departdate,
        finishdate,
        budget,
        minNumOfPeople,
        maxNumOfPeople,
        services,
        story,
        imageurl
    } = req.body;

    const userId = req.user.id;
    // console.log("userId", userId);
    Activity.findOrCreate({
        where: {
            theme,
            location,
            departdate,
            finishdate,
            budget,
            minNumOfPeople,
            maxNumOfPeople,
            services,
            story,
            imageurl,
            userId
        },
        defaults: {
            theme,
            location,
            departdate,
            finishdate,
            budget,
            minNumOfPeople,
            maxNumOfPeople,
            services,
            story,
            imageurl,
            userId
        }
    })
        .spread((activity, created) => {
            if (!created) {
                res.send("你已经提交过同样的活动了！");
            } else {
                res.send({ activityId: activity.id });
            }
        })
        .catch(e => next(e));
};

module.exports.fetchUserActivities = async (req, res, next) => {
    if (Number.isNaN(parseInt(req.params.userId))) {
        res.send(["输入地址无效"]);
        res.end();
        return null;
    }
    let userId;
    // 0 means the person itself is reviewing his/ her file
    if (+req.params.userId !== 0) {
        userId = req.params.userId;
    } else {
        userId = req.user.id;
    }

    let data = [];
    Activity.findAll({
        where: {
            userId,
            deleteIt: false
        }
    })
        .then(result => {
            if (result && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let value = result[i].dataValues;
                    // just in case in the future the page needs to add some thing different for the user who created the activities
                    if (req.user.id === value.userId) {
                        value["areYourActivities"] = true;
                    }
                    data.push(value);
                }
                return data;
            } else {
                res.send(["还没有活动"]);
                res.end();
                return null;
            }
        })
        .then(prevResult => {
            if (!prevResult) {
                return null;
            }
            res.send(data);
        })
        .catch(e => next(e));
};

module.exports.fetchActivityForEditting = (req, res, next) => {
    const id = req.user.id;
    const { activityId } = req.params;
    if (Number.isNaN(parseInt(activityId))) {
        res.send({ warning: "输入地址无效" });
        res.end();
        return null;
    }
    Activity.findOne({
        where: {
            id: activityId,
            deleteIt: false
        }
    })
        .then(result => {
            if (result) {
                // make sure the current logged user is the one who created the activity
                if (result.dataValues.userId === req.user.id) {
                    let departdate = moment(
                        result.dataValues.departdate
                    ).format("lll");
                    let finishdate = moment(
                        result.dataValues.finishdate
                    ).format("lll");
                    result.dataValues.departdate = departdate;
                    result.dataValues.finishdate = finishdate;
                    res.send(result.dataValues);
                } else {
                    res.send({ warning: "你没有权限修改此活动" });
                }
            } else {
                res.send({ warning: "此活动不存在" });
            }
        })
        .catch(e => next(e));
};

module.exports.updateUserActivity = (req, res, next) => {
    const { activityId } = req.params;
    const userId = req.user.id;
    const edittedValues = req.body;

    if (Number.isNaN(parseInt(activityId))) {
        res.send("输入地址无效");
        res.end();
        return null;
    }

    if (edittedValues.hasOwnProperty("imageurl")) {
        Activity.findOne({
            where: {
                id: activityId,
                userId,
                deleteIt: false
            }
        })
            .then(result => {
                if (!result) {
                    return res.send("该活动不存在或者你没有修改权限!");
                } else {
                    result.update({ imageurl: edittedValues.imageurl });
                    res.send(result.dataValues)
                }
            })
            .catch(e => next(e));
    } else {
        Activity.update(edittedValues, {
            where: {
                id: activityId,
                userId,
                deleteIt: false
            }
        })
            .then(result => {
                // [1]
                if (result && result.length === 1) {
                    res.send("修改成功！");
                } else {
                    res.send("该活动不存在或者你没有修改权限!");
                }
            })
            .catch(e => {
                next(e);
            });
    }
};

module.exports.deleteUserActivity = (req, res, next) => {
    const activityId = req.params.activityId;
    // console.log("deletedId", activityId)
    if (Number.isNaN(parseInt(activityId))) {
        res.send("输入地址无效");
        res.end();
        return null;
    }
    const userId = req.user.id;
    Activity.findOne({
        where: {
            id: activityId,
            userId
        }
    })
        .then(result => {
            if (!result) {
                res.send("你没有权限或者该活动不存在");
            } else {
                result.update({
                    deleteIt: true
                });
                res.send({ imgurl: result.imageurl });
            }
        })
        .catch(e => {
            next(e);
        });
};
// Do with DEnormalization here???????????????
module.exports.fetchActivity = (req, res, next) => {
    let response = [];
    Activity.findAll({
        where: {
            deleteIt: false
        }
    })
        .then(activities => {
            let length = activities.length;
            for (let i = 0; i < length; i++) {
                let departdate = moment(
                    activities[i].dataValues.departdate
                ).format("lll");
                let finishdate = moment(
                    activities[i].dataValues.finishdate
                ).format("lll");
                activities[i].dataValues.departdate = departdate;
                activities[i].dataValues.finishdate = finishdate;
                const data = activities[i].dataValues;
                const activityId = data.id;
                const userId = data.userId;
                Rating.findAndCountAll({
                    where: {
                        activityId,
                        parentId: 0,
                        replyToId: 0
                    }
                })
                    .then(result => {
                        data.numOfRater = result.count;
                        return result.count;
                    })
                    .then(count => {
                        if (count == 0) {
                            data.averageScore = 0;
                        } else {
                            Rating.sum("numOfStars", {
                                where: { activityId }
                            }).then(sum => {
                                data.averageScore =
                                    Math.floor(sum / count * 10) / 10;
                            });
                        }
                    })
                    .then(() => {
                        ActivityLikes.findOrCreate({
                            where: { activityId },
                            defaults: {
                                numOfLikes: 0,
                                userMarkers: ""
                            }
                        })
                            .spread((activity, created) => {
                                data.likes = activity.numOfLikes;
                            })
                            .then(() => {
                                User.findById(userId)
                                    .then(user => {
                                        data.username = user.username;
                                        response.push(data);
                                        if (response.length == length) {
                                            res.send(response);
                                        }
                                    })
                                    .catch(e => next(e));
                            })
                            .catch(e => next(e));
                    })
                    .catch(e => next(e));
            }
        })
        .catch(e => next(e));
};

module.exports.fetchOneActivity = (req, res, next) => {
    const userId = req.user.id;
    const { activityId } = req.params;
    if (Number.isNaN(parseInt(activityId))) {
        res.send({ warning: "输入地址无效" });
        res.end();
        return null;
    }

    let data;
    Activity.findById(activityId)
        .then(activity => {
            if (activity && activity.deleteIt === false) {
                let departdate = moment(activity.dataValues.departdate).format(
                    "lll"
                );
                let finishdate = moment(activity.dataValues.finishdate).format(
                    "lll"
                );
                activity.dataValues.departdate = departdate;
                activity.dataValues.finishdate = finishdate;
                data = activity.dataValues;
                return data;
            } else {
                res.send({ warning: "该活动不存在或者已经被删除" });
                res.end();
                return null;
            }
        })
        .then(prevResult => {
            if (!prevResult) {
                return null;
            }
            User.findById(data.userId)
                .then(user => {
                    data.username = user.username;
                    data.mail = user.mail;
                    data.userimageurl = user.imageurl;
                    if (user.id === userId) {
                        data.isYourActivity = true;
                    }
                })
                .then(() => {
                    console.log(data);
                    res.send(data);
                });
        })
        .catch(e => next(e));
};

module.exports.clickLikes = (req, res, next) => {
    const userId = req.user.id;
    const { activityId } = req.params;
    if (Number.isNaN(parseInt(activityId))) {
        res.send({ warning: "输入地址无效" });
        res.end();
        return null;
    }
    const userMarker = userId + ";";

    let result = {};

    ActivityLikes.findOrCreate({
        where: { activityId },
        defaults: {
            userMarkers: "" + userMarker,
            numOfLikes: 1
        }
    }).spread((activity, created) => {
        if (created) {
            result[activityId] = activity.numOfLikes;
            res.send(result);
        } else {
            if (activity.userMarkers.includes(userMarker)) {
                activity
                    .update({
                        userMarkers: activity.userMarkers.replace(
                            userMarker,
                            ""
                        ),
                        numOfLikes: activity.numOfLikes - 1
                    })
                    .then(() => {
                        result[activityId] = activity.numOfLikes;
                        res.send(result);
                    });
            } else {
                activity
                    .update({
                        userMarkers: activity.userMarkers + userMarker,
                        numOfLikes: activity.numOfLikes + 1
                    })
                    .then(() => {
                        result[activityId] = activity.numOfLikes;
                        res.send(result);
                    });
            }
        }
    });

    // Add the activity to user's favorite
    // const userId = req.user.id;
    // const { activityId } = req.params;
    // id | favorites | createdAt | updatedAt | userId
    // !!!!!!!activityId is string!!!!!!
    Favorite.findOrCreate({
        where: {
            userId
        },
        defaults: {
            favorites: [+activityId]
        }
    }).spread((favorite, created) => {
        let modifiedFavs;
        if (!created) {
            if (favorite.favorites.includes(+activityId)) {
                let index = favorite.favorites.indexOf(+activityId);
                modifiedFavs = favorite.favorites
                    .slice(0, index)
                    .concat(favorite.favorites.slice(index + 1));
            } else {
                favorite.favorites.push(+activityId);
                modifiedFavs = favorite.favorites;
            }
        }
        favorite.update({
            favorites: modifiedFavs
        });
        // console.log(favorite.favorites);
        //  [] or [15,4,2]
    });
};