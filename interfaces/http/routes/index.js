const student = require('./student');
const account = require('./account');

const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

module.exports = (app) => {
    app.get('/health', (req, res, next) => {
        res.json({ status: 'OK' });
        next();
    });

    app.post('/auth/verify', auth, (req, res, next) => {
        res.send(204);
        next();
    });

    app.del('/auth/invalidate', auth, account.invalidate);

    app.post('/auth', account.auth);
    app.post('/auth/invalidate', auth, account.invalidate);
    app.post('/students', auth, student.save);
    app.get('/students', auth, student.list);
    app.get('/students/csv', auth, student.generateListCsv);

    app.get('/users', auth, isAdmin, account.list);
    app.post('/users', auth, isAdmin, account.create);
    app.put('/users/:id', auth, isAdmin, account.update);

}