const restify = require('restify');
const port = process.env.PORT || 80;
const app = restify.createServer();


class Server {
    init() {
        app.use(restify.bodyParser());
        app.use(restify.queryParser());
        app.pre(restify.pre.sanitizePath());
        app.listen(port, () => console.log(`${app.name} listening at port ${port}`));
    }
}

module.exports = Server