import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import { isIP } from 'net';
import path from 'path';
require('dotenv').config()
const http = require('http')
const app = express();

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        callback(null, true);
    }
}));

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true
}));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(express.static(path.join(__dirname, '../media')))

app.use((req, res, next) => {
    if (isIP(req.hostname) == 0) {
        req.baseUri = req.protocol + '://' + req.hostname + '/';
    } else {
        if (!req.secure) {
            let port = app.get('port');
            req.baseUri = req.protocol + '://' + req.hostname + (port == 80 ? '' : (':' + port)) + '/';
        } else {
            let port = app.get('https_port');
            req.baseUri = req.protocol + '://' + req.hostname + (port == 443 ? '' : (':' + port)) + '/';
        }
    }
    next();
});

app.use('/api', routes);

const server = http.createServer(app);

const HTTP_PORT = normalizePort(process.env.PORT || 8000);
app.set('port', HTTP_PORT);
server.listen(HTTP_PORT, onListening);

function onListening() {
    let addr = this.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Web server listening on ' + bind);
}

function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}
