const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  login: {
    type: String
  },
  password: {
    type: String
  }
}, {
  versionKey: false
});

AccountModel = mongoose.model('Account', AccountSchema);

module.exports = AccountModel;