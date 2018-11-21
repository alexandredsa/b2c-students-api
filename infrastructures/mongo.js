const params = {
    default: "mongodb://localhost:27017/anglo",
    test: "mongodb://localhost:27017/angloTest"
};

const mongoose = require('mongoose');
mongoose.Promise = Promise;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const DBUrl = (typeof params[process.env.NODE_ENV] !== 'undefined') ?
    params[process.env.NODE_ENV] : params.default;

module.exports = {
    init: () => {
        return new Promise((resolve, reject) => {
            mongoose.connect(DBUrl, {}, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    process.exit(1);
                }
                else {
                    console.info(`[${process.env.NODE_ENV}] DB connection successful`);
                    resolve();

                    mongoose.connection.on('disconnected', () => console.warn('Mongoose connection disconnected from DB'));

                    mongoose.connection.on("connected", (ref) => console.info('DB reconnection successful'));

                    mongoose.connection.on("error", (err) => {
                        console.error('Mongoose reached limit of retries', err);
                        process.exit(1);
                    });
                }
            });
        });
    }
};