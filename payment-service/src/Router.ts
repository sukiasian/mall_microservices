import * as express from "express";
import * as redis from "redis";
import Controller from "./Controller";
import { MicroserviceURL } from "./types/enums";
import { AbstractRouter } from "./types/abstracts";
import GetUserTokenMiddleware from "./middleware/GetUserTokenMiddleware";

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
            MicroserviceURL.DEBTS,
            this.getUserTokenMiddleware.intercept,
            this.controller.getClientDebts
        );
    };

    public getExpressInstance = () => {
        return this.expressInstance;
    };
}
