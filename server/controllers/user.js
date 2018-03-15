const User = require("../models").User;

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
            'mail',
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
    });
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