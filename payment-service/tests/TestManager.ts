import * as express from 'express';
import { faker } from '@faker-js/faker';
import { PaymentBody, _1CServerResponse } from '../src/types/interfaces';
import Controller from '../src/Controller';
import Router from '../src/Router';
import UtilFunctions from '../src/utils/UtilFunctions';
import { Server } from '../src/Server';
import { Application } from '../src/Application';
import _1CService from '../src/_1CService';
import Redis from '../src/Redis';
import Service from '../src/Service';

export default class TestManager {
    private static appExpressInstance: express.Application;
    private static server: Server;

    static {
        UtilFunctions.configureDotenvTest();
    }

    private static openServer = (): void => {
        const service = new Service();
        const _1Cservice = new _1CService();
        const controller = new Controller(service, _1Cservice);

        const redisClient = Redis.getClient();

        const router = new Router(controller, redisClient).getExpressInstance();

        this.appExpressInstance = new Application(router).getExpressInstance();
        this.server = new Server(this.appExpressInstance);

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

    public static createPaymentBody = (): PaymentBody => {
        return {};
    };
}
