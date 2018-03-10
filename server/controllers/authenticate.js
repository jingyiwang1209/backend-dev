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
    // get user from passport
    // req.user:
    //    { id: 6,
    // mail: 'robert@gmail.com',
    // password: '$2a$10$bqeLmIeOYu/prAGamSP0s.cIuLyVpktpqdeCsXCa0KVpRASQhzFlW',
    // username: '哥斯拉',
    // sex: '男',
    // age: 40,
    // city: 'San Francisco',
    // yearOfLiving: 15,
    // hometown: '旧金山',
    // school: '加大伯克利分校',
    // major: '机械工程，材料科学',
    // language: '良好',
    // hobby: '汽车',
    // personality: '快乐',
    // createdAt: 2018-01-02T06:43:37.753Z,
    // updatedAt: 2018-02-26T21:00:40.142Z }
    const userId = req.user.id;
    const updates = req.body;
    // console.log("updatesdata", updates);
    // 23 { userId: 23, key: 'mail', value: 'shizuwang1209@gmail.co' }
    let { key, value } = updates;
    User.findById(userId).then(user => {
        if (!user) {
            res.send("该用户不存在");
        } else {
            if (key === "mail") {
                User.findOne({
                    where: {
                        mail: value
                    }
                }).then(result => {
                    if (result) {
                        res.send(value + "已被使用");
                    } else {
                        // console.log("user!!!!", user);
                        user
                            .update({
                                mail: value
                            })
                            .then(updatedUser => {
                                // [1]
                                res.send([key, value]);
                            });
                    }
                });
            } else {
                user
                    .update({
                        [key]: value
                    })
                    .then(updatedUser => {
                        // [1]
                        res.send([key, value]);
                    });
            }
        }
    });
};