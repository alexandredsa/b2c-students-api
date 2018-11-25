const Account = require('../domains/account');

const updateUser = (id, user) => {
    return Account.findByIdAndUpdate(id, user, { new: true });
}

module.exports = updateUser