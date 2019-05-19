const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

const googleKey = require('../keys').passportKeys.googleKeys;

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: googleKey.clientID,
        clientSecret: googleKey.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // Callback function for authentication
        console.log(profile);
        User.findOne({ googleId: profile.id }, (err, user) => {
            if(err || !user){
                new User({
                    name: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('New user created: ' + newUser);
                    done(null, newUser);
                });
            } else{
                console.log("Already found user: " + user);
                done(null, user);
            }
            
        });
    })
);