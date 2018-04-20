const jwt = require("jwt-simple");
const keys = require("../../config/keys");

module.exports = async (userId) => {
    let  timestamp = new Date().getTime();
    let  token = jwt.encode({ sub: userId, iat: timestamp }, keys.secret);
    return token;
};