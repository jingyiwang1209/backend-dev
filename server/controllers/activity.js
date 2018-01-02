const Activity = require("../models").Activity;
const User = require("../models").user;

module.exports.addActivity = (req, res, next) => {
    try {
        const {
            location,
            departdate,
            finishdate,
            budget,
            services,
            story,
            images
        } = req.body;
        const userId = req.user.id;
        console.log("userId", userId);
        Activity.findOrCreate({
            where: {
                location,
                departdate,
                finishdate,
                budget,
                services,
                story,
                images,
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