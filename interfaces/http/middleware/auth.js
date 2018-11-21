const { get } = require('../../cache');

const auth = (req, res, next) => {
    const token = req.headers['app-token'];
    get(token)
        .then(reply => {
            console.log(reply)
            if (reply) {
                req.params.user = reply;
                next();
            } else {
                res.send(401, 'Token is not valid');
            }
        })
        .catch(err => res.send(500, err.message));
}

module.exports = auth;