const signupController = require('../controllers/signup');

module.exports = (app)=>{
    app.post('/api/users', signupController);
};