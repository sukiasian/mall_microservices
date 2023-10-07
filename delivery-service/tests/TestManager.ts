import * as express from 'express';
import * as redis from 'redis';
import { faker } from '@faker-js/faker';
import Controller from '../src/Controller';
import Router from '../src/Router';
import UtilFunctions from '../src/utils/UtilFunctions';
import { Server } from '../src/Server';
import { Application } from '../src/Application';
import ApiService from '../src/ApiService';
import Redis from '../src/Redis';
import Service from '../src/Service';
import LoginMiddleware from '../src/middleware/LoginMiddleware';

export default class TestManager {
    private static appExpressInstance: express.Application;
    private static server: Server;

    static {
        UtilFunctions.configureDotenvTest();
    }

    private static openServer = (): void => {
        const redisClient = Redis.getClient();
        const service = new Service();
        const apiService = new ApiService(redisClient);
        const controller = new Controller(service, apiService);
        const loginMiddleware = new LoginMiddleware(redisClient);

        const router = new Router(controller, loginMiddleware).getExpressInstance();

        this.appExpressInstance = new Application(router).getExpressInstance();
        this.server = new Server(this.appExpressInstance, redisClient, apiService);

        const { handleExitProcess } = UtilFunctions;

        handleExitProcess();

        this.server.start();
    };

    private static closeServer = (): void => {
        this.server.close();
    };

    public static start = (): void => {
        this.openServer();
    };

    public static stop = (): void => {
        this.closeServer();
    };

    static {
        this.start();
    }

    public static getAppExpressInstance = (): express.Application => {
        return this.appExpressInstance;
    };

    public static cookieExists = (res: any, cookieName: string): boolean => {
        for (let cookie of res.headers['set-cookie']) {
            if (cookie.includes(cookieName)) {
                return true;
            }
        }

        return false;
    };
}
