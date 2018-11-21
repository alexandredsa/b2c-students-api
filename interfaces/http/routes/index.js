const student = require('./student');
const account = require('./account');

const auth = require('../middleware/auth');

module.exports = (app) => {
    app.post('auth', account.auth);
    app.post('students', auth, student.save);
}