const passportService = require("../middleware/passport");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const keys = require("../config/keys");

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

module.exports = app => {
    app.get("/api/upload/activity", requireAuth, (req, res) => {
        const key = `${req.user.id}/activity/${uuid()}.jpeg`;
        s3.getSignedUrl(
            "putObject",
            {
                Bucket: "utrip-bucket",
                ContentType: "image/jpeg",
                Key: key
            },
            (err, url) => {
                console.log(url);
                res.send({ key, url });
            }
        );
    });
    app.get("/api/replace/activity/:userId", requireAuth, (req, res) => {
        const yourself = req.user.id;
        const userId = req.params.userId;
        if (yourself === +userId) {
            const key = `${req.user.id}/activity/${uuid()}.jpeg`;
            s3.getSignedUrl(
                "putObject",
                {
                    Bucket: "utrip-bucket",
                    ContentType: "image/jpeg",
                    Key: key
                },
                (err, url) => {
                    console.log(url);
                    res.send({ key, url });
                }
            );
        }
        else {
            res.send("你没有权限修改");
        }
    });
    app.post("/api/deleteImage", requireAuth, (req, res) => {
        const { imgurl } = req.body;
        console.log("imgurl", imgurl);
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