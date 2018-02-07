const winston = require('winston');
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level : process.env.LOG_LEVEL || 'info',
        timestamp : tsFormat,
        colorize: true
      })
    ]
});

module.exports = logger;
