const authenticate = require('../../../usecases/authenticateByCredentials');

module.exports = {
    auth: (req, res, next) => {
        const credentials = req.body;
        const { user } = req.params
        authenticate(credentials)
            .then(result => res.json(200, result))
            .catch(err => {
                console.error(err);
                res.json(err.status, err.msg);
            })
    }
}