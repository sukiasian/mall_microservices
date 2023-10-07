import * as express from 'express';
import { AbstractRouter } from './types/abstracts';
import Controller from './Controller';
import { MicroserviceURL } from './types/enums';
import LoginMiddleware from './middleware/LoginMiddleware';
import GetUserTokenMiddleware from './middleware/GetUserTokenMiddleware';

export default class Router implements AbstractRouter {
    private expressInstance: express.Router;
    private controller: Controller;
    private loginMiddleware: LoginMiddleware;
    private getUserTokenMiddleware: GetUserTokenMiddleware;

    constructor(controller: Controller, loginMiddleware: LoginMiddleware) {
        this.controller = controller;
        this.loginMiddleware = loginMiddleware;
        this.getUserTokenMiddleware = new GetUserTokenMiddleware();
        this.expressInstance = express.Router();

        this.configure();
    }

    public configure = () => {
        this.expressInstance.get(
            MicroserviceURL.RESTAURANTS,
            this.loginMiddleware.intercept,
            this.controller.getRestaurantsByMarketId
        );

        this.expressInstance.get(
            MicroserviceURL.RESTAURANT,
            this.loginMiddleware.intercept,
            this.controller.getMenuByRestaurantId
        );

        this.expressInstance.post(
            MicroserviceURL.ADDRESSES,
            this.getUserTokenMiddleware.intercept,
            this.controller.addNewAddress
        );

        this.expressInstance.get(
            MicroserviceURL.ADDRESSES,
            this.getUserTokenMiddleware.intercept,
            this.controller.getUserDeliveryAddresses
        );

        this.expressInstance.patch(
            MicroserviceURL.ADDRESS,
            this.getUserTokenMiddleware.intercept,
            this.controller.editAddress
        );

        this.expressInstance.delete(
            MicroserviceURL.ADDRESS,
            this.getUserTokenMiddleware.intercept,
            this.controller.deleteAddress
        );

        this.expressInstance.get(
            MicroserviceURL.ORDERS,
            this.loginMiddleware.intercept,
            this.getUserTokenMiddleware.intercept,
            this.controller.getUserOrders
        );

        this.expressInstance.get(
            MicroserviceURL.ORDER,
            this.loginMiddleware.intercept,
            this.getUserTokenMiddleware.intercept,
            this.controller.getOrderByOrderId
        );
    };

    public getExpressInstance = () => {
        return this.expressInstance;
    };
}
