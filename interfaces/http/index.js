const restify = require('restify');
const port = process.env.PORT || 80;
const corsMiddleware = require('restify-cors-middleware')
const app = restify.createServer();
const routes = require('./routes');


class Server {
    init() {
        app.use(restify.bodyParser());
        app.use(restify.queryParser());
        app.pre(restify.pre.sanitizePath());
        const cors = corsMiddleware({
            origins: ['*']
        })
        app.pre(cors.preflight)
        app.use(cors.actual)
        app.listen(port, () => console.log(`${app.name} listening at port ${port}`));
        routes(app);
    }
}

module.exports = Server