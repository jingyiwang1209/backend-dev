const passportService = require("../middleware/passport");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const AWS = require("aws-sdk");
const gm = require("gm");
const uuid = require("uuid/v1");
const keys = require("../config/keys");
const async = require("async");

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

module.exports = app => {
    // 1. upload user's new replaced image and return the key for 'getObject' later
    app.get("/api/replace/image/:userId", requireAuth, (req, res) => {
        const yourself = req.user.id;
        const userId = req.params.userId;
        let key = "";
        if (+userId === 0) {
            // user wants to replace avatar image
            key = `${req.user.id}/avatar/${uuid()}.jpeg`;
        } else if (yourself === +userId) {
            // user wants to replace activity image
            key = `${req.user.id}/activity/${uuid()}.jpeg`;
        } else {
            return res.send("你没有权限修改");
        }

        s3.getSignedUrl(
            "putObject",
            {
                Bucket: "utrip-bucket",
                ContentType: "image/jpeg",
                Key: key
            },
            (err, url) => {
                if (err) {
                    console.log("err", err);
                } else {
                    res.send({ key, url });
                }
            }
        );
    });
    // 2. get the user's new replace image object using (raw before cropped),
    // then crop and upload it to the target destination in the bucket
    app.post("/api/cropImage", requireAuth, (req, res) => {
        if (!req.user.id) {
            return;
        }
        const { userId, keyforUrl, width, height, x, y } = req.body;
        if (userId !== 0 && req.user.id !== userId) {
            return;
        }

        let targetKey = "";
        let w = 0;
        let h = 0;
        if (userId === 0) {
            // users wants wto replace avatar image
            targetKey = `${req.user.id}/avatar-target/${uuid()}.jpeg`;
            w = 128;
            h = 128;
        } else {
            targetKey = `${req.user.id}/activity-target/${uuid()}.jpeg`;
            w = 400;
            h = 225;
        }


        async.waterfall(
            [
                function download(next) {
                    s3.getObject(
                        {
                            Bucket: "utrip-bucket",
                            Key: keyforUrl
                        },
                        next
                    );
                },

                function crop(response, next) {
                    gm(response.Body)
                        .crop(width, height, x, y)
                        .resize(w, h)
                        .toBuffer("jpeg", function(err, buffer) {
                            if (err) {
                                next(err);
                            } else {
                                next(null, response.ContentType, buffer);
                            }
                        });
                },

                function upload(contentType, data, next) {
                    targetKey = targetKey;
                    s3.putObject(
                        {
                            Bucket: "utrip-bucket",
                            ContentType: contentType,
                            Key: targetKey,
                            Body: data
                        },
                        next
                    );
                }
            ],
            function(err) {
                if (err) {
                    console.log("Error", err, targetKey);
                    res.send("上传失败！");
                } else {
                    console.log("success!", targetKey);
                    res.send({ srcKey: keyforUrl, targetKey: targetKey });
                }
            }
        );
    });

    app.post("/api/deleteImage", requireAuth, (req, res) => {
        const { imgurl } = req.body;
        // console.log("imgurl", imgurl);
        const params = {
            Bucket: "utrip-bucket",
            Key: imgurl
        };

        s3.deleteObject(params, (err, data) => {
            if (err) {
                console.log(err, err.stack); // an error occurred
            } else {
                console.log(data);
                res.send(data);
            } // successful response
        });
    });
};