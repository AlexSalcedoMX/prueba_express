import winston from 'winston';
import moment from 'moment';

/**
 * Provides a singleton for a logger.
 */
const logger = (() => {
    let instance;

    function createInstance() {
        const loggerInstance = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    colorize: true,
                    timestamp: () => {
                        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                        return date;
                    }
                })
            ]
        });

        return loggerInstance;
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default logger;
