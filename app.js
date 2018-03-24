const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./server/routes/routes");
const uploadRoutes = require("./server/routes/uploadRoutes");

app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const originWhiteList = ["http://localhost:3000", "http://45.55.12.226"];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(originWhiteList.indexOf(origin) === -1){
      let msg = 'Not allowed origin';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


routes(app);
uploadRoutes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get("*", (req, res) =>
    res.status(200).send({
        greeting: "Welcome to Utrip!"
    })
);


module.exports = app;