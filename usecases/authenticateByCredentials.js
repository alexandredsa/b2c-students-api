const md5 = require('md5');
const hat = require('hat');
const Account = require('../domains/account');
const { set, get } = require('../interfaces/cache');

const authenticate = (credentials) => {
    const { login, password } = credentials;
    return new Promise((resolve, reject) => {
        Account.findOne({ login, password: md5(password) })
            .then(account => {
                if (!account) {
                    reject({ status: 401, msg: "Invalid token" });
                }

                if (!account.status) {
                    reject({ status: 403, msg: "Usuário inativado" });
                } else {
                    const token = hat();
                    set(token, JSON.stringify({ id: account._id.toString(), role: account.role }));
                    resolve({
                        user: account.login,
                        token
                    });
                }
            })
            .catch(err => reject(err))
    })

}
module.exports = authenticate;