const Redis = require('../../infrastructures/redis');
const { promisify } = require('util');

module.exports = {
    set: (key, value) => {
        const client = new Redis().getClient();
        client.set(key, value);
    },
    get: (key) => {
        const client = new Redis().getClient();
        const getAsync = promisify(client.get).bind(client);
        return getAsync(key);
    }
}