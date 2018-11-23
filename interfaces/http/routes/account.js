const authenticate = require('../../../usecases/authenticateByCredentials');
const invalidateToken = require('../../../usecases/invalidateToken');

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
    }
}