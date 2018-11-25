const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  login: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['ADMIN', 'EMPLOYEE'],
    default: 'EMPLOYEE'
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  versionKey: false
});

AccountModel = mongoose.model('Account', AccountSchema);

module.exports = AccountModel;