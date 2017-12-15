const User = require("../models").user;
const jwt = require('jwt-simple');

const generateToken = (user)=>{
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp}, "sfasfdsfwegkal");
};

module.exports = (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const sex = req.body.sex;
        const age = req.body.age;
        const city = req.body.city;
        const yearOfLiving = req.body.yearOfLiving;
        const hometown = req.body.hometown;
        const school = req.body.school;
        const major = req.body.major;
        const language = req.body.language;
        const hobby = req.body.hobby;
        const personality = req.body.personality;

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
                res.status(422).send({ error: "Email already in use!" });
            } else {
                res.send({password:user.password});
            }
        });
    } catch (e) {
        next(e);
    }
};