const Message = require("../models").Message;
const User = require("../models").User;
const Activity = require("../models").Activity;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _ = require("lodash");

// 2018/05/03 12:09
function getFormattedDate(gmtDate) {
    let date = new Date(gmtDate);
    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    let hour = date.getHours().toString();
    hour = hour.length > 1 ? hour : "0" + hour;

    let miniute = date.getMinutes().toString();
    miniute = miniute.length > 1 ? miniute : "0" + miniute;
    return year + "/" + month + "/" + day + " " + hour + ":" + miniute;
}

module.exports.sendMessage = (req, res, next) => {
    const { to, message, activityId } = req.body;
    const fromWho = req.user.id;
    // console.log(fromWho, to, message, activityId)
    // 43 35 'sdaf' 79
    Message.create({
        from: fromWho,
        to,
        message,
        activityId,
        toHasRead: false
    }).then(message => {
        message.dataValues.createdAt = getFormattedDate(
            message.dataValues.createdAt
        );
        let result = message.dataValues;
        result.self = fromWho;
        User.findAll({
            where: {
                [Op.or]: {
                    id: [fromWho, to]
                }
            }
        }).then(users => {
            users.forEach(user => {
                if (user.id === +fromWho) {
                    result.yourselfimageurl = user.imageurl;
                } else {
                    result.imageurl = user.imageurl;
                    result.username = user.username;
                }
            });
        });
        let activityTheme = "";
        Activity.findById(activityId).then(activity => {
            result.activityTheme = activity.theme;
            // console.log("!!!!!!!!!", result)
            res.send(result);
        });
    });
};

module.exports.fetchMyMessages = (req, res, next) => {
    const yourself = req.user.id;
    Message.findAll({
        where: {
            [Op.or]: {
                from: yourself,
                to: yourself
            }
        },
        // DESC makes showing the latest messages first
        order: [["createdAt", "DESC"]]
    }).then(messages => {
        if (messages.length === 0) {
            return res.send({ warning: "你还没有任何消息" });
        }
        let messageMap = { messageObject: {}, unread: 0 };
        let unread = 0;
        let users = [];
        let usernames = {};
        let activities = [];
        let activitiyNames = {};
        for (let i = 0; i < messages.length; i++) {
            messages[i].dataValues.self = yourself;
            let messageRow = messages[i].dataValues;
            messageRow.createdAt = getFormattedDate(messageRow.createdAt);
            users.indexOf(messageRow.from) === -1
                ? users.push(messageRow.from)
                : null;
            users.indexOf(messageRow.to) === -1
                ? users.push(messageRow.to)
                : null;
            activities.indexOf(messageRow.activityId) === -1
                ? activities.push(messageRow.activityId)
                : null;

            // If you sent the message, for yourself then it should not be unread..
            if (!messageRow.toHasRead && messageRow.from !== yourself) {
                messageMap.unread += 1;
            }
            if (messageMap.messageObject[messageRow.activityId]) {
                messageMap.messageObject[messageRow.activityId].push(
                    messageRow
                );
            } else {
                messageMap.messageObject[messageRow.activityId] = [messageRow];
            }
        }
        // console.log(users, activities);
        User.findAll({
            where: {
                [Op.or]: {
                    id: users
                }
            }
        }).then(users => {
            users.forEach(user => {
                usernames[user.id] = {
                    username: user.username,
                    imageurl: user.imageurl
                };
            });
            // console.log("usernames", usernames);
        });
        Activity.findAll({
            where: {
                [Op.or]: {
                    id: activities
                }
            }
        })
            .then(activities => {
                activities.forEach(activity => {
                    activitiyNames[activity.id] = activity.theme;
                });
            })
            .then(() => {
                _.map(messageMap.messageObject, (messages, key) => {
                    // console.log(messages, key);
                    for (let i = 0; i < messages.length; i++) {
                        let message = messages[i];
                        let fromWho = message.from;
                        if (usernames.hasOwnProperty(fromWho)) {
                            if (fromWho === yourself) {
                                messages[i].yourselfimageurl =
                                    usernames[fromWho].imageurl;
                            } else {
                                messages[i].username =
                                    usernames[fromWho].username;
                                messages[i].imageurl =
                                    usernames[fromWho].imageurl;
                            }
                        }
                        if (usernames.hasOwnProperty(message.to)) {
                            if (messages[i].to !== yourself) {
                                messages[i].username =
                                    usernames[message.to].username;
                                messages[i].imageurl =
                                    usernames[message.to].imageurl;
                            } else {
                                messages[i].yourselfimageurl =
                                    usernames[message.to].imageurl;
                            }
                        }
                        if (activitiyNames.hasOwnProperty(message.activityId)) {
                            messages[i].activityTheme =
                                activitiyNames[message.activityId];
                        }
                    }
                });
                // console.log(messageMap.messageObject);
                return res.send(messageMap);
            });
    });
};

module.exports.markAsRead = (req, res, nex) => {
    // console.log(req.body.from, req.body.to, req.body.activityId);
    const { to, activityId } = req.body;
    const fromWho = req.body.from;
    const yourself = req.user.id;
    console.log(yourself, fromWho, to, typeof yourself, typeof fromWho);

    // you can only markAsRead on the messages To you, not from you and not to someone else.
    if (fromWho === yourself || yourself !== to) {
        return res.send("你无权已读");
    }
    let user = fromWho;

    Message.update(
        {
            toHasRead: true
        },
        {
            where: {
                activityId,
                toHasRead: false,
                [Op.or]: {
                    from: user,
                    to: user
                }
            }
        }
    ).then(result => {
        console.log(result[0]);
        let num = result[0];
        let actId = activityId;
        console.log(num, fromWho, to, actId);
        res.send({ num, fromWho, to, actId });
    });
};