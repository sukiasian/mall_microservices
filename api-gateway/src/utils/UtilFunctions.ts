import * as dotenv from 'dotenv';
import * as path from 'path';
import * as http from 'http';
import { NodeEnvironment } from '../types/enums';
import basicLogger from '../loggers/basicLogger';

export default class UtilFunctions {
    private static server: http.Server;

    public static configureDotenv = (): void => {
        switch (process.env.NODE_ENV) {
            case NodeEnvironment.TEST: {
                dotenv.config({
                    path: path.resolve(__dirname, '../', '../', '.test.env'),
                });
            }

            default:
                dotenv.config({
                    path: path.resolve(__dirname, '../', '../', '.env'),
                });
        }
    };

    public static setServer = (server: http.Server) => {
        this.server = server;
    };

    public static getServer = (): http.Server => {
        return this.server;
    };

    public static handleExitProcess = (): void => {
        process
            .on('unhandledRejection', (reason, p) => {
                basicLogger.error('Unhandled Rejection: ', reason, p);

                this.shutdownChildProcesses();
            })
            .on('uncaughtException', (err) => {
                basicLogger.error('Uncaught Exception thrown', err);

                this.shutdownChildProcesses();
            })
            .on('SIGTERM', () => {
                basicLogger.info('SIGTERM signal received.');

                this.shutdownChildProcesses();
            })
            .on('SIGINT', () => {
                basicLogger.info('SIGINT signal received.');

                this.shutdownChildProcesses();
            })
            .on('beforeExit', () => {
                basicLogger.info('Exit occured.');

                this.shutdownChildProcesses();
            });
    };

    private static shutdownChildProcesses = (): void => {
        let errorExists: any;

        this.server.close((err: any) => {
            if (err) {
                basicLogger.error(err);

                errorExists = err;
            }
        });

        process.exit(errorExists ? 1 : 0);
    };

    public static checkIfResponseIsSuccessful = (statusCode: number): boolean => {
        return (statusCode >= 200 && statusCode < 400) ?? false;
    };

    public static makeDecimal = (value: string): number => {
        return parseInt(value, 10);
    };
}
