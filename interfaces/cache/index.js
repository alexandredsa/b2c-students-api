const Redis = require('../../infrastructures/redis');
const { promisify } = require('util');

const REDIS_TTL = 60 * 60 * 24 * 7; // ONE WEEK

module.exports = {
    set: (key, value) => {
        const client = new Redis().getClient();
        client.set(key, value, 'EX', REDIS_TTL);
    },
    get: (key) => {
        const client = new Redis().getClient();
        const getAsync = promisify(client.get).bind(client);
        return getAsync(key);
    },
    del: (key) => {
        const client = new Redis().getClient();
        client.del(key);
    }
}