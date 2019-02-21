const config = process.env.NODE_ENV !== 'ci' ? require('./env_config') : {
    PORT: process.env.PORT || '3000',
    REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    COOKIE_KEY: process.env.COOKIE_KEY,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ad_node_project',
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

module.exports = config;