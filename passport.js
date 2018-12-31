const Passport = require('passport');
const redis = require('./../adapters/redis');
const BearerStrategy = require('passport-http-bearer');

Passport.use(new BearerStrategy(
    (token, done) => {

        redis.get(`access_token:${token}`, (error, user) => {
            if (error) done(error);
            if (!user) done(false);
            user = JSON.parse(user); 
            done(false, user, { scope: user.scope });
        });
    }
));

module.exports = Passport;