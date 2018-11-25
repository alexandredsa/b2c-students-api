const { get } = require('../../cache');
const Account = require('../../../domains/account');

const auth = (req, res, next) => {
    const token = req.headers['app-token'];
    get(token)
        .then(reply => {
            if (reply) {
                req.params.user = JSON.parse(reply);
                return Account.findById(req.params.user.id)
            } else {
                throw new Error("TOKEN_IS_NOT_VALID");
            }
        })
        .then(account => {
            if (account && account.status) {
                next();
            } else {
                throw new Error("ACCOUNT_NOT_ACTIVE");
            }
        })
        .catch(err => {
            let code = 500;

            if(err.message === 'TOKEN_IS_NOT_VALID') {
                code = 401;
            }

            if(err.message === 'ACCOUNT_NOT_ACTIVE') {
                code = 403;
            }
            
            res.send(code, err.msg)
        });
}

module.exports = auth;