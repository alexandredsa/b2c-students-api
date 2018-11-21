const student = require('./student');
const account = require('./account');

const auth = require('../middleware/auth');

module.exports = (app) => {
    app.get('/health', (req, res, next) => {
        res.json({status: 'OK'})
        next();
    });

    app.post('/auth', account.auth);
    app.post('/students', auth, student.save);
    app.get('/students', auth, student.list)
}