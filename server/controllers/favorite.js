const Activity = require("../models").Activity;
const User = require("../models").User;
const Favorite = require("../models").Favorite;

module.exports.fetchUserFavorites = (req, res, next) => {
    // user must be logged in to get his/her favorites
    const userId = req.user.id;
    // console.log("userid", userId)
    Favorite.findOne({
        where: {
            userId
        }
    })
        .then(favorite => {
            if (!favorite || favorite.favorites.length === 0) {
                res.send({
                    warning: "还没有收藏"
                });
                res.end();
            } else {
                let data = [];
                for (let i = 0; i < favorite.favorites.length; i++) {
                    Activity.findById(favorite.favorites[i]).then(result => {
                        if (!result) {
                            res.send({ warning: "活动已经不存在" });
                            res.end();
                        } else {
                            data.push(result.dataValues);
                            if (data.length === favorite.favorites.length) {
                                // console.log("finalData",data);
                                res.send(data);
                                return null;
                            }
                        }
                    });
                }
            }
        })
        .catch(e => {
            next(e);
        });

    //   [ { id: 8,
    //   theme: '珠海城市风光7日游',
    //   location: '珠海市 广东省',
    //   departdate: '16 Feb 2018 6:23',
    //   finishdate: '28 Feb 2018 6:23',
    //   budget: '100000',
    //   services: [ '徒步旅行', '汽车接送' ],
    //   story: '我在珠海长大，生活。珠海就像一颗璀璨的明珠，在中国的南方熠熠生辉。白天的珠海车水马龙，穿梭入流。傍晚的珠海华灯初上，光彩夺目。我爱这里的一切。',
    //   images: [],
    //   createdAt: 2018-02-21T02:23:53.967Z,
    //   updatedAt: 2018-02-21T02:23:53.967Z,
    //   userId: 7 },
    //   { id: 15,
    //   theme: '青岛海滨城市5日游',
    //   location: '青岛市 山东省',
    //   departdate: '16 Mar 2018 4:22',
    //   finishdate: '20 Mar 2018 4:22',
    //   budget: '2000',
    //   services: [ '徒步旅行', '汽车接送', '购物打折' ],
    //   story: '青岛是个清新，活力的城市。我出生在这里。长大后离家多年，但是每年都回回来看看。我爱这里的海鲜，爱这里的海风，爱这里好客的居民。青岛是我永远的家。',
    //   images: [],
    //   createdAt: 2018-03-08T00:23:21.721Z,
    //   updatedAt: 2018-03-08T00:23:21.721Z,
    //   userId: 6 } ]
};