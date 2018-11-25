const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  liveNear: {
    type: String
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
    index: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
}, {
    versionKey: false
  });

StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;