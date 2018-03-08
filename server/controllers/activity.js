const Activity = require("../models").Activity;
const User = require("../models").User;
const ActivityLikes = require("../models").ActivityLikes;
const Rating = require("../models").Rating;

module.exports.addActivity = (req, res, next) => {
    try {
        const images = req.body.images;
        const imageURLs = images.map(image => {
            let imageURL = image[0].preview.slice(5);
            return imageURL;
        });

        const {
            theme,
            location,
            departdate,
            finishdate,
            budget,
            services,
            story
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
                services,
                story,
                images: imageURLs,
                userId
            },
            defaults: {
                theme,
                location,
                departdate,
                finishdate,
                budget,
                services,
                story,
                images: imageURLs,
                userId
            }
        }).spread((activity, created) => {
            if (!created) {
                res.send("你已经提交过同样的活动了！");
            } else {
                res.send("活动被成功创建!");
            }
        });
    } catch (e) {
        next(e);
    }
};

module.exports.fetchUserActivities = (req, res, next) => {
    const userId = req.params.userId;
    if (Number.isNaN(parseInt(userId))) {
        return null;
    }
    let data = [];
    Activity.findAll({
        where: { userId }
    })
        .then(result => {
            for (let i = 0; i < result.length; i++) {
                data.push(result[i].dataValues);
            }
        })
        .then(() => {
            // console.log(data)
            //     [ { id: 7,
            // theme: '大连城市风光游',
            // location: '大连市 辽宁省',
            // departdate: '23 Feb 2018 6:16',
            // finishdate: '28 Feb 2018 6:16',
            // budget: '5000',
            // services: [ '徒步旅行', '汽车接送', '购物打折' ],
            // story: '我在大连生活了10年。这里的一山一水一草一木都充满了灵性。大连是一个热情，开方，时尚的城市。海纳百川，兼容并蓄。',
            // images: [],
            // createdAt: 2018-02-21T02:18:16.284Z,
            // updatedAt: 2018-02-21T02:18:16.284Z,
            // userId: 6 } ]
            res.send(data);
        });
};

// { id: 12,
//   theme: '北京三日游',
//   location: '北京市 北京市',
//   departdate: '23 Mar 2018 9:45',
//   finishdate: '31 Mar 2018 9:45',
//   budget: '5000',
//   services: [ '徒步旅行', '购物打折' ],
//   story: '我在北京呆了2年，对北京文化，景点念念不忘。北京的景点大气辉煌，充满历史感。我一定会带你领略中华在过去的帝国风采。',
//   images: [ 'http://localhost:3000/a8a47ac8-30e7-4de6-b394-a03f9b0996c3' ],
//   createdAt: 2018-03-01T17:48:00.606Z,
//   updatedAt: 2018-03-01T17:48:00.606Z,
//   userId: 9 }

module.exports.fetchActivityForEditting = (req, res, next) => {
    const id = req.user.id;
    const { activityId } = req.params;
    if (Number.isNaN(parseInt(activityId))) {
        return null;
    }
    Activity.findById(activityId)
        .then(result => {
            // make sure the current logged user is the one who created the activity
            if (result.dataValues.userId === req.user.id) {
                res.send(result.dataValues);
            } else {
                // res.send({})
                return null;
            }
        })
        .catch(e => next(e));
};

module.exports.updateUserActivity = (req, res, next) => {
    const activityId = req.params.activityId;
    const edittedValues = req.body;
    // 7 { services: [ '徒步旅行', '汽车接送' ] }
    console.log("edittedValues", edittedValues)

    Activity.update(
        edittedValues,
        {
            where: {
                id: activityId
            }
        }
    ).then((result)=>{
       console.log("done", result)
    })
};

// Do with DEnormalization here???????????????
module.exports.fetchActivity = (req, res, next) => {
    try {
        let response = [];
        Activity.findAll().then(activities => {
            let length = activities.length;
            for (var i = 0; i < length; i++) {
                const data = activities[i].dataValues;
                const activityId = data.id;
                const userId = data.userId;
                Rating.findAndCountAll({ where: { activityId } })
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
                                User.findById(userId).then(user => {
                                    data.username = user.username;
                                    response.push(data);
                                    if (response.length == length) {
                                        res.send(response);
                                    }
                                });
                            });
                    });
            }
        });
    } catch (e) {
        next(e);
    }
};

module.exports.fetchOneActivity = (req, res, next) => {
    const activityId = req.params.activityId;
    let data;
    Activity.findById(activityId)
        .then(activity => {
            data = activity.dataValues;
        })
        .then(() => {
            User.findById(data.userId)
                .then(user => {
                    data.username = user.username;
                })
                .then(() => {
                    res.send(data);
                });
        });
};

module.exports.clickLikes = (req, res, next) => {
    const userId = req.user.id;
    const activityId = req.params.activityId;
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
};