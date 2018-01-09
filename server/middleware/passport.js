const passport = require("passport");
const User = require("../models").User;
const keys = require("../config/keys");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const localLogin = new LocalStrategy({ usernameField: "email" }, function(
    email,
    password,
    done
) {
    User.findOne({ where: { mail: email } }).then(user => {
        if (!user) {
            return done(null, false, { message: "The email does not exist."});
        } else {
            let promise = user.comparePassword(password);
            promise.then((response, err) => {
                if (response) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "The passport is not correct."});
                }
            });
        }
    });
});

// 1.Setup options for JWT Strategy
// to let passport know where to find the jwt and use which secret to decode the jwt
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: keys.secret
};

// 2. Create JWT strategy;
// jtw_payload here is the DECODED token : { sub: user.id, iat: timestamp}
const jwtLogin = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    // See if the user.id in jwt_payload exists in our database or not.
    // if it does, call 'done' with that user,
    // otherwise, call 'done' without that user obj
    User.findById(jwt_payload.sub).then(user => {
        // console.log("user.dataValues", user.dataValues)
        if (user) {
            return done(null, user.dataValues);
        } else {
            return done(null, false);
        }
    });
});

// 3. To tell passport to use the JWT strategy
passport.use(jwtLogin);
passport.use(localLogin);