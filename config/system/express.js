import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

import loggerUtil from './../../utils/logger';

const logger = loggerUtil.getInstance();

let walk;

function loadRoutes(router, callback) {
    // Load URLs
    const routesPath = `${__dirname}/../../routes`;
    walk = (path) => {
        let newPath = '';
        fs.readdirSync(path).forEach((file) => {
            newPath = `${path}/${file}`;
            const stat = fs.statSync(newPath);
            if (stat.isFile()) {
                if (/(.*)\.(js$|coffee$)/.test(file)) {
                    const route = require(newPath); // eslint-disable-line
                    route.default.setRoutes(router);
                }
            } else if (stat.isDirectory() && file !== 'middlewares') {
                walk(newPath);
            }
        });
    };
    walk(routesPath);

    if (callback) callback(router);
}

function init() {
    const app = express();
    const server = require('http').Server(app);
    const router = express.Router();

    app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true}));

    loadRoutes(router, (attachedRouter) => {
        app.use(attachedRouter);
        app.listen(process.env.PORT, () => {
            logger.info('%s listening at %s', process.env.APP_NAME, process.env.PORT);
            
        });
    });
}

export default init;