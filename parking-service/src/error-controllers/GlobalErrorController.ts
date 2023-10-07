import * as express from 'express';
import { NodeEnvironment } from '../types/enums';
import basicLogger from '../loggers/basicLogger';
import AppError from '../utils/AppError';

export default class GlobalErrorController {
    public static sendErrorProd = (err: AppError, res: express.Response): void => {
        if (err.isOperational) {
            basicLogger.error(err);

            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        } else {
            basicLogger.error(err);

            res.status(err.statusCode).json({
                status: err.status,
                message: '',
            });
        }
    };
    public static sendErrorDev = (err: AppError, res: express.Response): void => {
        basicLogger.error(err);

        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    };
    public static sendErrorTest = (err: AppError, res: express.Response): void => {
        if (err.isOperational) {
            basicLogger.error(err);

            res.status(err.statusCode).json({
                message: err.message,
            });
        } else {
            basicLogger.error(err);

            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
    };

    public static handle: express.ErrorRequestHandler = (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void => {
        err.statusCode = err.statusCode || 500;
        err.message = err.message || '';

        switch (process.env.NODE_ENV) {
            case NodeEnvironment.DEVELOPMENT:
                this.sendErrorDev(err, res);
                break;

            case NodeEnvironment.TEST:
                this.sendErrorTest(err, res);
                break;

            case NodeEnvironment.PRODUCTION:
                this.sendErrorProd(err, res);
                break;
        }
    };
}
