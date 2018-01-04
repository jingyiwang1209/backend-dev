const Demand = require("../models").Demand;
const User = require("../models").user;

module.exports.addDemand = (req, res, next) => {
    try {
        const { location, departdate, finishdate, budget, services } = req.body;
        const userId = req.user.id;
        console.log("userId", userId);
        Demand.findOrCreate({
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
        }).spread((demand, created) => {
            if (!created) {
                res.send("This demand is already created!");
            } else {
                res.send("This demand is successfully created!");
            }
        });
    } catch (e) {
        next(e);
    }
};