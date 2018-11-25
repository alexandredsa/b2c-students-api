const Account = require('../domains/account');

const listAccounts = () => {
    return Account.find().select("-password");   
}

module.exports = listAccounts;