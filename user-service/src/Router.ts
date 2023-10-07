import * as express from 'express';
import { AbstractRouter } from './types/abstracts';
import Controller from './Controller';
import { MicroserviceURL } from './types/enums';
import GetUserTokenMiddleware from './middleware/GetUserTokenMiddleware';

export default class Router implements AbstractRouter {
    private expressInstance: express.Router;
    private controller: Controller;
    private getUserTokenMiddleware: GetUserTokenMiddleware;

    constructor(controller: Controller) {
        this.controller = controller;

        this.expressInstance = express.Router();
        this.getUserTokenMiddleware = new GetUserTokenMiddleware();
        this.configure();
    }

    public configure = () => {
        this.expressInstance.get(
            MicroserviceURL.VISITS,
            this.getUserTokenMiddleware.intercept,
            this.controller.getUserVisitsAmount
        );

        this.expressInstance.get(
            MicroserviceURL.USERS,
            this.getUserTokenMiddleware.intercept,
            this.controller.getUser
        )
    };

    public getExpressInstance = () => {
        return this.expressInstance;
    };
}
