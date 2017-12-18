const signupController = require('../controllers/authenticate').signup;
const loginController = require('../controllers/authenticate').login;

module.exports = (app)=>{
    app.post('/api/signup', signupController);
    app.post('/api/login', loginController);
    app.get('/api/test', (req, res, next)=>{
        res.send('This is a test for jwt!');
    });
};