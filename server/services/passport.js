const passport = require('passport');
const User = require("../models").User;
const keys = require('../config/keys');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;


const localLogin = new LocalStrategy({ usernameField: 'email'}, function(email, password, done){
     // Verify this username(email) and pw, call done with the user
     // if it is the correct username(email) and pw,
     // otherwise, call done with false
     User.findOne({ email: email}, function(err, user){
        if(err){ return done(err);}
        if(!user) { return done(null, false);}

        // compare passwords - is 'password' equal to user.password?
        let promise = user.comparePassword(password);
        user.comparePassword(password, function(err, isMatch){
            if(err){return done(err);}
            if(!isMatch){ return done(null, false);}
            return done(null, user);
        });
     });


    User.findOne({ where: { mail: email } }).then(user => {
        if (!user) {
            return done(null, false, { error:'Cannot find your email!'});
        } else {
            let promise = user.comparePassword(password);
            promise.then((response, err) => {
                if (response) {
                    console.log('response',response)
                   return done(null, user);
                } else {
                    console.log('!!!!!!!')
                     return done(null, false, { message: 'Incorrect password.' });
                }
            });
        }
    });

});



// 1.Setup options for JWT Strategy
// to let passport know where to find the jwt and use which secret to decode the jwt
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.secret
};


// 2. Create JWT strategy;
// jtw_payload here is the DECODED token : { sub: user.id, iat: timestamp}
const jwtLogin = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    // See if the user.id in jwt_payload exists in our database or not.
    // if it does, call 'done' with that user,
    // otherwise, call 'done' without that user obj
    User.findOne({ id: jwt_payload.sub }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

// 3. To tell passport to use the JWT strategy
passport.use(jwtLogin);
passport.use(localLogin);