const md5 = require('md5');
const hat = require('hat');
const Account = require('../domains/account');
const { del } = require('../interfaces/cache');

const invalidateToken = (token) => {
    return new Promise((resolve, reject) => {
        del(token);
        resolve();
    })

}
module.exports = invalidateToken;