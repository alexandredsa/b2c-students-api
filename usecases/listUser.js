const Account = require('../domains/account');
const ObjectId = require('mongodb').ObjectID;

const listAccounts = (userId) => {
    return Account.find({ _id: { $ne: ObjectId(userId) } }).sort('login').select("-password");
}

module.exports = listAccounts;