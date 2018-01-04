const Activity = require("../models").Activity;
const User = require("../models").user;


module.exports.addActivity = (req, res, next) => {
    try {
        const images = req.body.images;
        const imageURLs = images.map((image)=>{
             let imageURL = image[0].preview.slice(5);
             return imageURL;
        });

        const {
            location,
            departdate,
            finishdate,
            budget,
            services,
            story,
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
                images:imageURLs,
                userId
            },
            default: {
                location,
                departdate,
                finishdate,
                budget,
                services,
                story,
                images:imageURLs,
                userId
            }
        }).spread((activity, created) => {
            if (!created) {
                res.send("This activity is already created" );
            } else {
                res.send("This activity is successfully created!");
            }
        });
    } catch (e) {
        next(e);
    }
};