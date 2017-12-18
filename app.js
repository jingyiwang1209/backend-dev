const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jsonWebToken = require('jsonwebtoken');
const routes = require('./server/routes/routes');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next)=>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT' ){
        console.log('authorization', req.headers.authorization);
        jsonWebToken.verify(req.headers.authorization.split(' ')[1], 'sfasfdsfwegkal', (err, decode)=>{
            if(err) { req.user = undefined;}
            req.user = decoded;
            next();
        });
    }else {
        console.log('authorization', req.headers.authorization);
        req.user = undefined;
        next();
    }

});

routes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  greeting: 'Welcome to Utrip!',
}));

app.use((err,req,res,next)=>{
    res.status(404).send({error:err.message});

});



module.exports = app;