const Account = require('../domains/account');
const md5 = require('md5');

const updateUser = (id, user) => {
    if (user.password) {
        user.password = md5(user.password);
    }

    return Account.findByIdAndUpdate(id, user, { new: true });
}

module.exports = updateUser