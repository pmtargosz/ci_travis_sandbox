const passpoort = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const config = require('../config');

const User = mongoose.model('User');

const googleStrategyOptions = {
    callbackURL: config.GOOGLE_CALLBACK_URL,
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    proxy: true
}

passpoort.serializeUser((user, done) => {
    done(null, user.id);
});

passpoort.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passpoort.use(new GoogleStrategy(googleStrategyOptions, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({
            googleId: profile.id
        });

        if (existingUser) {
            return done(null, existingUser);
        }

        const user = await new User({
            googleId: profile.id,
            displayName: profile.displayName
        });

        user.save();

        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));