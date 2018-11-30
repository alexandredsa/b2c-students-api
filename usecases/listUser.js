const Account = require('../domains/account');
const ObjectId = require('mongodb').ObjectID;

const listAccounts = (userId) => {
    let query = { _id: { $ne: ObjectId(userId) } };
    return Account.find(query).sort('login').select("-password");
}

module.exports = listAccounts;