const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const config = require('./config');

// Models:
require('./models/User');
require('./models/Blog');

// Services:
require('./services/cache');
require('./services/passport');

// DB Connections:
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true
});

// Create Express App:
const app = express();

// Secure Headers:
app.use(helmet());

// Baisic Middlewares:
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Cookie Session:
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [config.COOKIE_KEY]
    })
);

// Passport:
app.use(passport.initialize());
app.use(passport.session());

// Static Files:
app.use(express.static('client/build'));

// Routes:
app.use('/', require('./routes'));

// Export Express App:
module.exports = app;