const Sequelize = require("sequelize");
const User = require("../models").User;
const jwt = require("jwt-simple");
const keys = require("../config/keys");
const qs = require("qs");

const generateToken = user => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
};

module.exports.signup = (req, res, next) => {
    const { email, password, username } = req.body;
    User.findOrCreate({
        where: {
            mail: email
        },
        defaults: {
            mail: email,
            password: password,
            username: username
        }
    }).spread((user, created) => {
        if (!created) {
            res.send("该邮箱已经存在");
        } else {
            let token = generateToken(user);
            res.send({ token });
        }
    });
};

module.exports.completeUserProfile = (req, res, next) => {
    const userId = req.user.id;
    console.log(userId, req.body);
    const completedValues = req.body;
    User.findById(userId).then(user => {
        if (!user) {
            res.send("该用户不存在");
        } else {
            user
                .update(completedValues)
                .then(updated => {
                    console.log("updated");
                    res.send("success");
                })
                .catch(e => {
                    next(e);
                });
        }
    });
};

module.exports.login = (req, res, next) => {
    let user = req.user.dataValues;
    res.send({ token: generateToken(req.user) });
};

module.exports.updateBasic = (req, res, next) => {
    const userId = req.user.id;
    const updates = req.body;
    let pair;
    if (updates.hasOwnProperty("imageurl")) {
        pair = {
            imageurl: updates.imageurl
        };
    } else if (updates.hasOwnProperty("password")) {
        pair = {
            password: updates.password
        };
    } else {
        pair = req.body;
    }

    // console.log("pair", pair);

    User.findById(userId)
        .then(user => {
            if (!user) {
                res.send("该用户不存在");
            } else {
                if (pair.hasOwnProperty("email")) {
                    User.findOne({
                        where: {
                            mail: pair.email
                        }
                    }).then(result => {
                        if (result) {
                            res.send(pair.email + "已被使用");
                        } else {
                            // console.log("user!!!!", user);
                            user.update(pair).then(updatedUser => {
                                // [1]
                                res.send("修改成功！");
                            });
                        }
                    });
                } else {
                    // beforeUpdate uses on user instance, not User model!!!!!
                    if (pair.hasOwnProperty("password")) {
                        user.cryptPassword(pair.password).then(result => {
                            user
                                .update({ password: result })
                                .then(updatedUser => {
                                    res.send("");
                                });
                        });
                    } else if (pair.hasOwnProperty("imageurl")) {
                        user.update(pair).then(updatedUser => {
                            res.send("");
                        });
                    } else {
                        user.update(pair).then(updatedUser => {
                            // [1]
                            res.send("修改成功！");
                        });
                    }
                }
            }
        })
        .catch(e => next(e));
};