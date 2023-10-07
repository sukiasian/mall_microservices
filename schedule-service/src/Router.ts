import * as express from "express";
import { AbstractRouter } from "./types/abstracts";
import Controller from "./Controller";
import { MicroserviceURL } from "./types/enums";
import GetUserTokenMiddleware from "./middleware/GetUserTokenMiddleware";

export default class Router implements AbstractRouter {
    private expressInstance: express.Router;
    private controller: Controller;
    private getUserTokenMiddleware: GetUserTokenMiddleware;

    constructor(controller: Controller) {
        this.expressInstance = express.Router();
        this.controller = controller;

        this.getUserTokenMiddleware = new GetUserTokenMiddleware();

        this.configure();
    }

    public configure = () => {
        this.expressInstance.get(
            MicroserviceURL.SCHEDULE,
            this.getUserTokenMiddleware.intercept,
            this.controller.getSchedule
        );
    };

    public getExpressInstance = () => {
        return this.expressInstance;
    };
}
