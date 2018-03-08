const Wish = require("../models").Wish;
const User = require("../models").User;
const WishLikes = require("../models").WishLikes;

module.exports.addWish = (req, res, next) => {
    const { location, departdate, finishdate, budget, services } = req.body;
    const userId = req.user.id;
    // console.log("userId", userId);
    Wish.findOrCreate({
        where: {
            location,
            departdate,
            finishdate,
            budget,
            services,
            userId
        },
        defaults: {
            location,
            departdate,
            finishdate,
            budget,
            services,
            userId
        }
    })
        .spread((wish, created) => {
            if (!created) {
                res.send("你已经提交过同样的愿望了！");
            } else {
                res.send("愿望被成功创建！");
            }
        })
        .catch(e => next(e));
};

module.exports.fetchWish = (req, res, next) => {
    const data = [];

    Wish.findAll()
        .then(wishes => {
            const length = wishes.length;
            for (var i = 0; i < wishes.length; i++) {
                let wish = wishes[i].dataValues;
                // console.log("wish", wish);
                let wishId = wish.id;
                WishLikes.findOrCreate({
                    where: { wishId },
                    defaults: {
                        numOfLikes: 0,
                        userMarkers: ""
                    }
                })
                    .spread((wishLike, created) => {
                        wish.likes = wishLike.numOfLikes;
                        data.push(wish);
                    })
                    .then(() => {
                        if (data.length == length) {
                            console.log("data", data);
                            res.send(data);
                        }
                    });
            }
        })
        .catch(e => next(e));
};

module.exports.fetchOneWish = (req, res, next) => {
    const { wishId } = req.params;
    if (Number.isNaN(parseInt(wishId))) {
        res.send({ warning: "输入地址无效" });
        res.end();
        return null;
    }
    let data;
    Wish.findById(wishId)
        .then(wish => {
            if (wish) {
                data = wish.dataValues;
                return data;
            } else {
                res.send({ warning: "该愿望不存在" });
                res.end();
                return null;
            }
        })
        .then(prevResult => {
            if (!prevResult) {
                res.end();
                return null;
            }
            User.findById(data.userId)
                .then(user => {
                    data.username = user.username;
                })
                .then(() => {
                    res.send(data);
                });
        });
};
// { id: 3,
//   location: '唐山市 河北省',
//   departdate: '23 Feb 2018 11:15',
//   finishdate: '01 Mar 2018 11:15',
//   budget: '2000',
//   services: [ '徒步旅行' ],
//   createdAt: 2018-02-21T19:15:53.875Z,
//   updatedAt: 2018-02-21T19:15:53.875Z,
//   userId: 6,
//   username: 'Robert' }

module.exports.wishLikes = (req, res, next) => {
    const { wishId } = req.params;
    if (Number.isNaN(parseInt(wishId))) {
        res.send({ warning: "输入地址无效" });
        res.end();
        return null;
    }
    const userId = req.user.id;
    const userMarker = userId + ";";
    const result = {};
    WishLikes.findOne({ where: { wishId } }).then(wishLike => {
        if (wishLike.userMarkers.includes(userMarker)) {
            wishLike
                .update({
                    userMarkers: wishLike.userMarkers.replace(userMarker, ""),
                    numOfLikes: wishLike.numOfLikes - 1
                })
                .then(() => {
                    result[wishId] = wishLike.numOfLikes;
                    console.log(result);
                    res.send(result);
                });
        } else {
            wishLike
                .update({
                    userMarkers: wishLike.userMarkers + userMarker,
                    numOfLikes: wishLike.numOfLikes + 1
                })
                .then(() => {
                    result[wishId] = wishLike.numOfLikes;
                    console.log(result);
                    res.send(result);
                });
        }
    }).catch((e)=>next(e))
};