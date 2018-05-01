const Sequelize = require("sequelize");
const Activity = require("../models").Activity;
const Wish = require("../models").Wish;
const User = require("../models").User;
const Rating = require("../models").Rating;
const qs = require("qs");
const Op = Sequelize.Op;

module.exports.fetchSearchData = (req, res, next) => {
    // { location: '石家庄市 河北省', services: [ '徒步旅行' ] }
    let location = qs.parse(req.query).location;
    let category = qs.parse(req.query).category;

    // console.log('backend', location,category)

    let data = [];
    if (category === "活动") {
        Activity.findAndCountAll({
            where: {
                location: location,
                deleteIt:false
            }
        }).then(result => {
            let length = result.count;
            if (result.count === 0) {
                res.send(["尚未有该城市活动"]);
                return null;
            } else {
                result.rows.forEach(row => {
                    let activityObj = row.dataValues;
                    activityObj["counter"] = result.count;
                    activityObj["category"] = "活动";

                    Rating.findAndCountAll({
                        where: {
                            activityId: activityObj.id,
                            parentId: 0,
                            replyToId: 0
                        }
                    }).then(result => {
                        if (result.count === 0) {
                            activityObj["averageScore"] = 0;
                        } else if (result.count === 1) {
                            activityObj["averageScore"] =
                                result.rows[0].dataValues.numOfStars;
                        } else {
                            let totalScore = 0;
                            result.rows.forEach(item => {
                                totalScore += item.dataValues.numOfStars;
                            });
                            let averageScore =
                                Math.floor(totalScore / result.count * 100) /
                                100;
                            activityObj["averageScore"] = averageScore;
                        }
                        data.push(activityObj);
                        if (data.length === length) {
                            // console.log("data", data);
                            res.send(data);
                        }
                    });
                });
            }
        });
    } else if (category === "愿望") {
        Wish.findAndCountAll({
            where: {
                location: location,
                deleteIt:false
            }
        })
            .then(result => {
                if (result.count === 0) {
                    res.send(["尚未有该城市愿望"]);
                    return null;
                } else {
                    result.rows.forEach(row => {
                        row.dataValues["counter"] = result.count;
                        row.dataValues["category"] = "愿望";
                        data.push(row.dataValues);
                    });
                    return data;
                }
            })
            .then(data => {
                // console.log(data);
                if (data) {
                    res.send(data);
                }
            });
    } else if (category === "向导") {
        let guides = [];
        let data = [];
        Activity.findAndCountAll({
            where: {
                location: location
            }
        }).then(result => {
            if (result.count === 0) {
                res.send(["尚未有该城市向导"]);
                return null;
            } else {
                result.rows.forEach(row => {
                    // row.dataValues["counter"] = result.count;
                    // row.dataValues["category"] = "guide";
                    // data.push(row.dataValues);
                    guides.push(row.dataValues.userId);
                });

                User.findAndCountAll({
                    where: {
                        id: {
                            [Op.or]: guides
                        }
                    }
                })
                    .then(result => {
                        result.rows.forEach(row => {
                            let guide = {};
                            guide["counter"] = result.count;
                            guide["category"] = "向导";
                            guide["age"] = row.dataValues.age
                            guide["id"] = row.dataValues.id;
                            guide["username"] = row.dataValues.username;
                            guide["sex"] = row.dataValues.sex;
                            guide["language"] = row.dataValues.language;
                            guide["location"] = location;
                            data.push(guide);
                        });

                        return data;
                    })
                    .then(data => {
                        // console.log("data", data);
                        // [
                        //     {
                        //         counter: 2,
                        //         category: "guide",
                        //         username: "理工狗",
                        //         sex: "男",
                        //         language: "普通话，大连话"
                        //     },
                        //     {
                        //         counter: 2,
                        //         category: "guide",
                        //         username: "柯基的守护神",
                        //         sex: "女",
                        //         language: "普通话，英语，日语"
                        //     }
                        // ];
                        if (data) {
                            res.send(data);
                        }
                    });
            }
        });
    }
};

