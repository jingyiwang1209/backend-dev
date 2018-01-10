const User = require("../models").User;

module.exports.fetchUser = (req, res, next) =>{
    const userId = req.params.userId;
    User.findById(userId).then((user)=>{
        res.send(user.dataValues);
    });

};


 // { id: 6,
 //  mail: 'robert@yahoo.com',
 //  password: '$2a$10$bqeLmIeOYu/prAGamSP0s.cIuLyVpktpqdeCsXCa0KVpRASQhzFlW',
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
