const Redis = require('../../infrastructures/redis');

module.exports = {
    set: (key, value) => {
        const client = new Redis().getClient();
        client.set(key, value);
    },
    get: (key, value, cb) => {
        const client = new Redis().getClient();
        client.get(key, value, cb);
    }
}