const winston = require('winston');
 
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs
    new winston.transports.File({ filename: 'logs/info.log', level: 'info'}), // info logs
    new winston.transports.File({ filename: 'logs/warn.log', level: 'warn'}), // warn logs
    new winston.transports.File({ filename: 'logs/trace.log', level: 'trace'}), // trace logs
    new winston.transports.File({ filename: 'logs/debug.log', level: 'debug'}), // debug
    new winston.transports.File({ filename: 'logs/fatal.log', level: 'fatal'}) // fatal
  ]
});
 
logger.trace = function(message) {
    logger.log('trace', message);
};
 
logger.debug = function(message) {
    logger.log('debug', message);
};
 
logger.info = function(message) {
    logger.log('info', message);
};
 
logger.warn = function(message) {
    logger.log('warn', message);
};
 
logger.fatal = function(message) {
    logger.log('fatal', message);
};
 
 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
 
module.exports = logger