const Sequelize = require('sequelize');
const Activity = require("../models").Activity;
const Wish = require("../models").Wish;
const qs = require("qs");



module.exports.fetchSearchData = (req, res, next) => {
    // { location: '石家庄市 河北省', services: [ '徒步旅行' ] }

    let location = qs.parse(req.query).location;
    let category = qs.parse(req.query).category;

   console.log('backend', location,category)

    let data = [];
    if (category === "activity") {
        Activity.findAndCountAll({
            where: {
                location: location
            }
        })
            .then(result => {
                result.rows.forEach(row => {
                    row.dataValues["counter"] = result.count;
                    row.dataValues['category'] = "activity"
                    data.push(row.dataValues);
                });
            })
            .then(() => {
                console.log(data);
                res.send(data);
            });
    } else if (category === "wish") {
        Wish.findAndCountAll({
            where: {
                location: location,
            }
        })
            .then(result => {
                result.rows.forEach(row => {
                    row.dataValues["counter"] = result.count;
                    row.dataValues['category'] = "wish";
                    data.push(row.dataValues);
                });
            })
            .then(() => {
                console.log(data);
                res.send(data);
            });
    }
};

// [ { id: 7,
//     theme: '大连城市风光游',
//     location: '大连市 辽宁省',
//     departdate: '23 Feb 2018 6:16',
//     finishdate: '28 Feb 2018 6:16',
//     budget: '5000',
//     services: [ '徒步旅行', '汽车接送', '购物打折' ],
//     story: '我在大连生活了10年。这里的一山一水一草一木都充满了灵性。大连是一个热情，开方，时尚的城市。海纳百川，兼容并蓄。',
//     images: [],
//     createdAt: 2018-02-21T02:18:16.284Z,
//     updatedAt: 2018-02-21T02:18:16.284Z,
//     userId: 6,
//     counter: 1 } ]

// return [] if not found