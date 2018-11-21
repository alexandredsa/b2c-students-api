const restify = require('restify');
const port = process.env.PORT || 80;
const app = restify.createServer();
const routes = require('./routes');


class Server {
    init() {
        app.use(restify.bodyParser());
        app.use(restify.queryParser());
        app.pre(restify.pre.sanitizePath());
        app.listen(port, () => console.log(`${app.name} listening at port ${port}`));
        routes(app);
    }
}

module.exports = Server