const signupController = require('../controllers/authenticate').signup;
const loginController = require('../controllers/authenticate').login;

module.exports = (app)=>{
    app.post('/api/signup', signupController);
    app.post('/api/login', loginController);
};