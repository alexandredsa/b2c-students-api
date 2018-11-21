const md5 = require('md5');
const hat = require('hat');
const Account = require('../domains/account');
const { set, get } = require('../interfaces/cache');

const authenticate = (credentials, user) => {
    const { login, password } = credentials;
    return new Promise((resolve, reject) => {
        Account.findOne({ login, password: md5(password) })
            .then(account => {
                const token = hat();
                set(token, user);
                resolve({
                    user: account.login,
                    token
                });
            })
            .catch(err => reject(err))
    })

}
module.exports = authenticate;