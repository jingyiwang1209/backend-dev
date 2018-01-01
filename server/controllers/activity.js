const Activity = require("../models").Activity;
const User = require("../models").user;

module.exports.addActivity = (userId, req, res, next) => {
    try {
        console.log('userId',userId);
        const {
            location,
            departdate,
            finishdate,
            budget,
            services,
            story,
            images
        } = req.body;
        Activity.findOrCreate({
            where: {
                location,
                departdate,
                finishdate,
                budget,
                services,
                story,
                userId
            },
            default: {
                location,
                departdate,
                finishdate,
                budget,
                services,
                story,
                images,
                userId
            }
        }).spread((activity, created) => {
            if (!created) {
                res.send({ error: "This activity is already created" });
            } else {
                res.send({
                    activity: "This activity is successfully created!"
                });
            }
        });
    } catch (e) {
        next(e);
    }
};