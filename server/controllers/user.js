const User = require("../models").User;
const Rating = require("../models").Rating;

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

    Rating.findAndCountAll({
        where: {
            creatorId
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
                // console.log("item", item.dataValues);
                total += item.numOfStars;
                data.push(item.dataValues);
            });
            let average = Math.floor(total / result.count * 100) / 100;

            data[0].average = average;
            // console.log("Data",data)
            //      [ { id: 61,
            //   feedback: '非常棒！！',
            //   numOfStars: 5,
            //   userId: 35,
            //   activityId: 18,
            //   createdAt: 2018-03-18T09:20:19.214Z,
            //   updatedAt: 2018-03-18T09:20:19.214Z,
            //   creatorId: 31,
            //   average: 4.5 },
            // { id: 58,
            //   feedback: '哥斯拉亲切和蔼，非常专业！',
            //   numOfStars: 4,
            //   userId: 36,
            //   activityId: 18,
            //   createdAt: 2018-03-18T09:17:42.570Z,
            //   updatedAt: 2018-03-18T09:17:42.570Z,
            //   creatorId: 31 } ]
            res.send(data);
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
            "hometown",
            "school",
            "major",
            "language",
            "hobby",
            "personality"
        ]
    }).then(user => {
        if (!user) {
            res.send({ warning: "该用户不存在" });
            res.end();
            return null;
        } else {
            console.log("userbasic", user.dataValues);
            res.send(user.dataValues);
        }
    }).catch((e)=>next(e))
};

// { id: 6,
//  mail: 'robert@yahoo.com',
//  username: 'Robert',
//  sex: 'male',
//  age: 40,
//  city: 'San Francisco',
//  yearOfLiving: 20,
//  hometown: 'San Francisco',
//  school: 'UC Berkeley',
//  major: 'Mechanical Engineering',
//  language: 'Good',
//  hobby: 'Cars',
//  personality: 'Patient',
//  createdAt: 2018-01-02T06:43:37.753Z,
//  updatedAt: 2018-01-02T06:43:37.753Z }