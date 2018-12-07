const restify = require('restify');
const port = process.env.PORT || 80;
const corsMiddleware = require('restify-cors-middleware')
const app = restify.createServer();
const routes = require('./routes');
const json2xls = require('json2xls');


class Server {
    init() {
        app.use(restify.bodyParser());
        app.use(restify.queryParser());
        app.pre(restify.pre.sanitizePath());
        app.use(json2xls.middleware);
        const cors = corsMiddleware({
            origins: ['*'],
            allowHeaders: ['app-token'],
        })
        app.pre(cors.preflight)
        app.use(cors.actual)
        app.listen(port, () => console.log(`${app.name} listening at port ${port}`));
        routes(app);
    }
}

module.exports = Server