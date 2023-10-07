import * as express from 'express';
import * as axios from 'axios';
import { faker } from '@faker-js/faker';
import { _1CServerResponse } from '../src/types/interfaces';
import Controller from '../src/Controller';
import Router from '../src/Router';
import UtilFunctions from '../src/utils/UtilFunctions';
import { Server } from '../src/Server';
import { Application } from '../src/Application';
import _1CService from '../src/_1CService';
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

        const router = new Router(controller).getExpressInstance();

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

    public static checkIfСookieExists = (res: any, cookieName: string): boolean => {
        for (let cookie of res.headers['set-cookie']) {
            if (cookie.includes(cookieName)) {
                return true;
            }
        }

        return false;
    };

    private static extractCookieFromRequestHeaders = (cookie: string): string => {
        return cookie.match(/(?<=user_token=).*?(?=;)/)![0];
    };

    public static acquireUserToken = async (): Promise<string | undefined> => {
        const signupBody = {
            phone: '79876543210',
            pass_token: 'Acquired on server.',
            password: 'qwerty123',
            last_name: faker.name.lastName(),
            name: faker.name.firstName(),
            second_name: 'Петрович',
            email: faker.internet.email(),
            birthday: '2000-01-16',
            marketing: {
                utm_source: '7e54g5d1bgdfh512esasf',
                utm_medium: 'se54g5d1bgdfh541esasf',
                utm_campaign: 'sdeg54se65g4s65safaf',
            },
        };

        // как получить куки ?

        const response = await axios.default.post('http://127.0.0.1:9000/signupOrLogin', signupBody);

        return (
            response.headers['set-cookie'] && this.extractCookieFromRequestHeaders(response.headers['set-cookie'][0])
        );
    };
}
