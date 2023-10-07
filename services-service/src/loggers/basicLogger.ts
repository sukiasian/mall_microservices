import * as winston from 'winston';

const basicLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.errors({ stack: true }),
                winston.format.json()
            ),
        }),
        new winston.transports.File({
            dirname: './log',
            filename: 'error.log',
            level: 'error',
        }),
        new winston.transports.File({
            dirname: './log',
            filename: 'info.log',
            level: 'info',
        }),
    ],
});

export default basicLogger;
