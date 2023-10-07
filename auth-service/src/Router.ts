import * as express from 'express';
import * as redis from 'redis';
import { AbstractRouter } from './types/abstracts';
import Controller from './Controller';
import { MicroserviceURL, RedisKey } from './types/enums';
import Middleware from './middleware/Middleware';
import RequestAttemptsLimiterMiddleware from './middleware/RequestAttemptsLimiterMiddleware';
import _1CService from './_1CService';
import FindUserInDBMiddleware from './middleware/FindUserInDBMiddleware';

export default class Router implements AbstractRouter {
    private expressInstance: express.Router;
    private controller: Controller;
    private signupAttemptsLimiterMiddleware: Middleware;
    private findUserInDBMiddleware: Middleware;

    constructor(controller: Controller, redisClient: redis.RedisClientType) {
        this.controller = controller;

        this.signupAttemptsLimiterMiddleware = new RequestAttemptsLimiterMiddleware(
            redisClient,
            RedisKey.SIGNUP_ATTEMPTS
        );

        this.findUserInDBMiddleware = new FindUserInDBMiddleware();

        this.expressInstance = express.Router();

        this.configure();
    }

    public configure = () => {
        this.expressInstance.get(
            MicroserviceURL.AUTH_CODE,
            this.findUserInDBMiddleware.intercept,
            this.controller.getPhoneConfirmationCode
        );

        this.expressInstance.post(
            MicroserviceURL.AUTH_CODE,
            this.findUserInDBMiddleware.intercept,
            this.controller.confirmPhone
        );

        this.expressInstance.get(MicroserviceURL.TOKEN, this.controller.getUserToken);
    };

    public getExpressInstance = () => {
        return this.expressInstance;
    };
}
