const Activity = require("../models").activity;

module.exports.addActivity = (userId, req, res, next) => {
    try {

        const {
            location,
            departtime,
            finishtime,
            budget,
            services,
            story,
            images
        } = req.body;
        Activity.findById(userId).then((Activity)=>Activity.findOrCreate({
            where: {
                location,
                departtime,
                finishtime,
                budget,
                services,
                story
            },
            default: {
                location,
                departtime,
                finishtime,
                budget,
                services,
                story,
                images
            }
        }).spread((activity, created) => {
            if (!created) {
                res.send({ error: "This activity is already created" });
            } else {
                res.send({
                    activity: "This activity is successfully created!"
                });
            }
        }));
    } catch (e) {
        next(e);
    }
};