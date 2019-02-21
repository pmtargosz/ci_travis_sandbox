const Buffer = require('buffer').Buffer;
const crypto = require('crypto');
const config = require('../../config');

module.exports = (user) => {
    const sessionObject = {
        passport: {
            user: user._id.toString()
        }
    }

    const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');

    const sig = crypto.createHmac('sha1', config.COOKIE_KEY).update('session=' + session).digest('base64').replace(/\/|\+|=/g, function (x) {
        return ({
            "/": "_",
            "+": "-",
            "=": ""
        })[x]
    });

    return {
        session,
        sig
    }
}