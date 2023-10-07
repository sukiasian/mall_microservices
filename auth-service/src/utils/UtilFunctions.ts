import * as http from 'http';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import basicLogger from '../loggers/basicLogger';
import Database from '../Database';

export default class UtilFunctions {
    private static server: http.Server;

    private static shutdownChildProcesses = async (): Promise<void> => {
        let errorExists: Error;

        this.server.close((err: Error) => {
            if (err) {
                basicLogger.error(err);

                errorExists = err;
            }
        });

        await Database.close();

        process.exit(errorExists ? 1 : 0);
    };

    public static handleExitProcess = async (): Promise<void> => {
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

    public static checkIfResponseIsSuccessful = (statusCode: number): boolean => {
        return (statusCode >= 200 && statusCode < 400) ?? false;
    };

    public static configureDotenvDev = (): void => {
        dotenv.config({
            path: path.resolve(__dirname, '../', '../', '.env'),
        });
    };

    public static configureDotenvTest = (): void => {
        dotenv.config({
            path: path.resolve(__dirname, '../../', '.test.env'),
        });
    };

    public static setServer = (server: http.Server) => {
        this.server = server;
    };

    public static getServer = (): http.Server => {
        return this.server;
    };

    public static makeDecimal = (value: string): number => {
        return parseInt(value, 10);
    };

    public static extractBearerToken = (header: string): string => {
        return header && header.match(/(?<=Bearer ).*/) && header.match(/(?<=Bearer ).*/)[0];
    };
}
