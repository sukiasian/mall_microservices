import * as express from 'express';
import { AbstractRouter } from './types/abstracts';
import Controller from './Controller';
import { MicroserviceURL } from './types/enums';

export default class Router implements AbstractRouter {
    private expressInstance: express.Router;
    private controller: Controller;

    constructor(controller: Controller) {
        this.controller = controller;

        this.expressInstance = express.Router();

        this.configure();
    }

    public configure = () => {};

    public getExpressInstance = () => {
        return this.expressInstance;
    };
}
