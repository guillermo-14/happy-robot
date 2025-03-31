import winston from 'winston';

// Define log levels and colors
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each log level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'white',
};

// Add colors to Winston
winston.addColors(colors);

// Define log format
const format = winston.format.combine(
  // Add timestamp
  winston.format.timestamp(),
  // Define message format
  winston.format.printf(
      (info) =>  `${info.timestamp} ${info.level.toUpperCase()} ${`\x1b[37m${info.message}\x1b[0m`}` 
    ),
    winston.format.colorize({ all: true }),
  // Colorize text based on level
);

// Define transports (outputs) for logs
const transports = [
  // Console
  new winston.transports.Console(),
];

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'debug',
  levels,
  format,
  transports,
});

export default logger;
