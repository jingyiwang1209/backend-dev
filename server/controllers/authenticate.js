const User = require("../models").User;
const jwt = require("jwt-simple");
const keys = require("../config/keys");
const qs = require("qs");
const generateToken = user => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
};

module.exports.verifySignupEmail = (req, res, next) => {
    let email = qs.parse(req.query).email;
    User.findOne({
        where: { mail: email }
    }).then(user => {
        if (user) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
};
module.exports.signup = (req, res, next) => {
    try {
        const {
            email,
            password,
            username,
            sex,
            age,
            city,
            yearOfLiving,
            hometown,
            school,
            major,
            language,
            hobby,
            personality
        } = req.body;

        User.findOrCreate({
            where: { mail: email },
            defaults: {
                mail: email,
                password: password,
                username: username,
                sex: sex,
                age: age,
                city: city,
                yearOfLiving: yearOfLiving,
                hometown: hometown,
                school: school,
                major: major,
                language: language,
                hobby: hobby,
                personality: personality
            }
        }).spread((user, created) => {
            if (!created) {
                res.send("该邮箱已经存在!");
            } else {
                let token = generateToken(user);
                res.send({ token, user: user.dataValues });
            }
        });
    } catch (e) {
        next(e);
    }
};

module.exports.login = (req, res, next) => {
    let user = req.user.dataValues;
    res.send({ token: generateToken(req.user), user });
};

module.exports.updateBasic = (req, res, next) => {
    const userId = req.params.userId;
    const updates = req.body;
    console.log("updatesdata", updates);
    // 23 { userId: 23, key: 'mail', value: 'shizuwang1209@gmail.co' }
    let { key, value } = updates;
    if (key === "mail") {
        User.findOne({
            where: {
                mail: value
            }
        }).then(result => {
            if (result) {
                console.log(value+" 已被使用");
                res.send(value+" 已被使用");
            } else {
                User.update(
                    {
                        mail: value
                    },
                    {
                        where: {
                            id: userId
                        }
                    }
                ).then(updatedUser => {
                    // [1]
                    // console.log(key,value)
                    res.send([key, value]);
                });
            }
        });
    } else {
        User.update(
            {
                [key]: value
            },
            {
                where: {
                    id: userId
                }
            }
        ).then(updatedUser => {
            // [1]
            // console.log(updatedUser, key, value)
            res.send([key, value]);
        });
    }
};