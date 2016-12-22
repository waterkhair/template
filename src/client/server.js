// Modules
import config from './config/main';
import http from 'http';
import express from 'express';
import winston from 'winston';
import morgan from 'morgan';
import index from './content/index';
import notFound from './content/not_found';

// Express
const app = express();
app.disable('x-powered-by');
app.use(morgan(process.env.NODE_ENV === 'production' ? '' : 'dev'));

// Routers
app.get('/*', (request, response, next) => {
    if (request.originalUrl.indexOf('/css/') === -1 && request.originalUrl.indexOf('/images/') === -1 && request.originalUrl.indexOf('/js/') === -1) {
        response.send(index({ app: config.app }));
    } else {
        next();
    }
});
app.use(express.static('content'));
app.use((request, response) => {
    response.send(notFound({ app: config.app }));
});

// Server
const server = http.createServer(app);
server.listen(8080, (error) => {
    if (error) {
        winston.error('Error: ' + error);
    } else {
        winston.info('Running client server on localhost:8080');
    }
});

export default server;
