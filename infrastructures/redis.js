const redis = require('redis');
let client;

class Redis {
    createClient() {
        return redis.createClient({
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD,
        });
    }

    getClient() {
        if (!client) {
            client = this.createClient();
        }

        return client;
    }
}

module.exports = Redis
