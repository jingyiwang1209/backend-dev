const User = require("../models").User;
const jwt = require("jwt-simple");
const keys = require("../config/keys");

const generateToken = user => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
};

module.exports.signup = (req, res, next) => {
    try {
        const { email, password, username,sex,age,city,yearOfLiving,hometown,school,major,language,hobby,personality} = req.body

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
            // console.log(user.get({plain:true}));
            // console.log(created);
            if (!created) {
                res.send({ error: "Email already in use!" });
            } else {
                let token = generateToken(user);
                res.send({ token });
            }
        });
    } catch (e) {
        next(e);
    }
};

module.exports.login = (req, res, next) => {
    res.send({ token:generateToken(req.user)});
};