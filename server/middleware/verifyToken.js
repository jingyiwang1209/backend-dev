const jsonWebToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        jsonWebToken.verify(
            req.headers.authorization,
            "sfasfdsfwegkal",
            (err, decoded) => {
                // decode { sub: 19, iat: 1513644411790 }
                if (err) req.user = undefined;
                else next();
            }
        );
    } else {
        req.user = undefined;
        res.send({error:'You need to register first!'});
    }
};

