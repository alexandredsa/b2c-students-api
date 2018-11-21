const { get } = require('../../cache');

const auth = (req, res, next) => {
    const token = req.headers['app-token'];
    get(token, (err, reply) => {
        if (reply) {
            req.params.user = reply;
            next();
        } else {
            res.status(401).end();
        }
    })
}

module.exports = auth;