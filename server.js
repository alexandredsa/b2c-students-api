require('dotenv').config()
const mongo = require('./infrastructures/mongo');
const Http = require('./interfaces/http');

mongo.init()
    .then(() => new Http().init())
    .catch(err => console.error(err));