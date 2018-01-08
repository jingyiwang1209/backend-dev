const Wish = require("../models").wish;
const User = require("../models").user;

module.exports.addWish = (req, res, next) => {
    try {
        const { location, departdate, finishdate, budget, services } = req.body;
        const userId = req.user.id;
        console.log("userId", userId);
        Wish.findOrCreate({
            where: {
                location,
                departdate,
                finishdate,
                budget,
                services,
                userId
            },
            default: {
                location,
                departdate,
                finishdate,
                budget,
                services,
                userId
            }
        }).spread((wish, created) => {
            if (!created) {
                res.send("This wish is already created!");
            } else {
                res.send("This wish is successfully created!");
            }
        });
    } catch (e) {
        next(e);
    }
};

module.exports.fetchWish = (req, res, next) => {
    try{
        console.log("userId for fetchWish", req.user.id);


    }catch(e){
        next(e);
    }
}