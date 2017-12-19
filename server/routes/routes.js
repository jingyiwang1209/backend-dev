const signupController = require('../controllers/authenticate').signup;
const loginController = require('../controllers/authenticate').login;
const verifyToken = require('../middleware/verifyToken');
module.exports = (app)=>{
    app.post('/api/signup', signupController);
    app.post('/api/login', loginController);
    app.get('/api/test', verifyToken, (req, res, next)=>{
        res.send('This is a test for jwt!');
    });
};