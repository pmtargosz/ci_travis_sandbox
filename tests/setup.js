jest.setTimeout(15000);

require('../models/User');

const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true
});