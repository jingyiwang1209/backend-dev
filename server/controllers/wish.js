const Wish = require("../models").Wish;
const User = require("../models").User;
const WishLikes = require("../models").WishLikes;


module.exports.fetchUserWishes = (req, res, next) => {
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
    Wish.findAll({
        where: { userId }
    })
        .then(result => {
            if (result && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let value = result[i].dataValues;
                    if (req.user.id === value.userId){
                        value["areYourWishes"] = true;
                    }
                    data.push(value);
                }
                return data;
            } else {
                res.send(["还没有愿望"]);
                res.end();
                return null;
            }
        })
        .then(prevResult => {
            if (!prevResult) {
                return null;
            }
            console.log(data)
            res.send(data);
        })
        .catch(e => next(e));
};

module.exports.fetchWishForEditting = (req, res, next) => {
    const id = req.user.id;
    const { wishId } = req.params;
    if (Number.isNaN(parseInt(wishId))) {
        res.send({ warning: "输入地址无效" });
        res.end();
        return null;
    }
    Wish.findById(wishId)
        .then(result => {
            if (result) {
                // make sure the current logged user is the one who created the wish
                if (result.dataValues.userId === req.user.id) {
                    // console.log(result.dataValues)
                    res.send(result.dataValues);
                } else {
                    res.send({ warning: "你没有权限修改此愿望" });
                }
            } else {
                res.send({ warning: "此愿望不存在" });
            }
        })
        .catch(e => next(e));
};

module.exports.updateUserWish = (req, res, next) => {
    const { wishId } = req.params;
    const userId = req.user.id;
    const edittedValues = req.body;
    // 7 { services: [ '徒步旅行', '汽车接送' ] }
    // console.log("edittedValues", edittedValues)
    if (Number.isNaN(parseInt(wishId))) {
        res.send("输入地址无效");
        res.end();
        return null;
    }

    Wish.update(edittedValues, {
        where: {
            id: wishId,
            userId
        }
    })
        .then(result => {
            // [1]
            if (result && result.length === 1) {
                res.send("修改成功！");

            } else {
                res.send("该愿望不存在或者你没有修改权限!");
            }
        })
        .catch(e => {
            next(e);
        });
};

module.exports.deleteUserWish = (req, res, next) => {
    const { wishId } = req.params;
    // console.log("deletedId", wishId)
    if (Number.isNaN(parseInt(wishId))) {
        res.send("输入地址无效");
        res.end();
        return null;
    }
    const userId = req.user.id;
    Wish.destroy({
        where: {
            id: wishId,
            userId
        }
    })
        .then(result => {
            // console.log("Result",result)
            if (result === 1) {
                res.send("成功删除该愿望");
            }
             // result === 0
            else {
               res.send("该愿望不存在或者你没有权限修改");
            }
        })
        .catch(e => {
            next(e);
        });
};


module.exports.addWish = (req, res, next) => {
    const { location, departdate, finishdate, budget, services, note } = req.body;
    const userId = req.user.id;
    // console.log("userId", userId);
    Wish.findOrCreate({
        where: {
            location,
            departdate,
            finishdate,
            budget,
            services,
            userId,
            note
        },
        defaults: {
            location,
            departdate,
            finishdate,
            budget,
            services,
            userId,
            note
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
    const userId = req.user.id;

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
                    data.mail = user.mail;
                    if(user.id === userId){
                        data.isYourWish = true;
                    }
                })
                .then(() => {
                    console.log("wish", data)
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