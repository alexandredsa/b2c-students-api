const { del } = require('../interfaces/cache');

const invalidateToken = (token) => {
    return new Promise((resolve, reject) => {
        del(token);
        resolve();
    })

}
module.exports = invalidateToken;