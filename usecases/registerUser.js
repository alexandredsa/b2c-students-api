const Account = require('../domains/account');
const md5 = require('md5');
const registerUser = (user) => {
    user.password = md5(user.password);
    return new Account(user).save()
}

module.exports = registerUser