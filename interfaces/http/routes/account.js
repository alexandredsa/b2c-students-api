const authenticate = require('../../../usecases/authenticateByCredentials');
const invalidateToken = require('../../../usecases/invalidateToken');
const registerUser = require('../../../usecases/registerUser');
const updateUser = require('../../../usecases/updateUser');
const listUser = require('../../../usecases/listUser');

module.exports = {
    auth: (req, res, next) => {
        const credentials = req.body;
        authenticate(credentials)
            .then(result => res.json(200, result))
            .catch(err => {
                console.error(err);
                res.json(err.status, err.msg);
            })
    },
    invalidate: (req, res, next) => {
        const token = req.headers['app-token'];
        invalidateToken(token)
            .then(() => res.send(204))
            .catch(err => {
                console.error(err);
                res.json(err.status, err.msg);
            })
    },
    create: (req, res, next) => {
        let user = req.body;
        registerUser(user)
            .then(result => res.json(201, result))
            .catch(err => res.json(500, err.message))
    },
    update: (req, res, next) => {
        const { id } = req.params;
        const user = req.body;

        updateUser(id, user)
            .then(result => res.json(201, result))
            .catch(err => res.json(500, err.message))
    },
    list: (req, res, next) => {
        const { user } = req.params;
        listUser(user.id)
            .then(result => res.json(200, result))
            .catch(err => res.json())
    }
}