const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const config = require('../config');

// Redis connection and setup
const client = redis.createClient(config.REDIS_URL);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;

    this.hashKey = JSON.stringify(options.key || '');

    return this;
};

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    const key = JSON.stringify({
        ...this.getQuery(),
        collection: this.mongooseCollection.name
    });

    const cachedValue = await client.hget(this.hashKey, key);

    // See if we have a value for 'key' in redis
    if (cachedValue) {
        const doc = JSON.parse(cachedValue)

        return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
    }

    // Otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments);

    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

    return result;
};

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey))
    }
};