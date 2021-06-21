import winston, {format} from 'winston';
import config from '../config';
const { printf } = format;

const transports = [];
if (process.env.NODE_ENV !== 'development') {
    transports.push(
        new winston.transports.Console({
            level: config.logs.level,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.prettyPrint()
            )
        })
    )
} else {
    const myFormat = printf(({ level, message, label, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
    });

    transports.push(
        new winston.transports.Console({
            level: config.logs.level,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: config.logs.format
                }),
                winston.format.errors({ stack: true }),
                myFormat
            )
        })
    )
}

const LoggerInstance = winston.createLogger({
    transports
});

export default LoggerInstance;