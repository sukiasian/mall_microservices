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

    public configure = () => {
        this.expressInstance.get(MicroserviceURL.MEMBERSHIPS, this.controller.getAllUserTickets);
        this.expressInstance.get(MicroserviceURL.MEMBERSHIP, this.controller.getUserTicketById);
        this.expressInstance.post(
            MicroserviceURL.MEMBERSHIP_ACTIVATION,
            this.controller.activateTicketAndSendPaymentToCRM
        );

        this.expressInstance.post(MicroserviceURL.FREEZING, this.controller.freezeTicket);
        this.expressInstance.put(MicroserviceURL.FREEZING, this.controller.unfreezeTicket);
        this.expressInstance.delete(MicroserviceURL.FREEZING, this.controller.cancelUpcomingTicketFreezing);
    };

    public getExpressInstance = () => {
        return this.expressInstance;
    };
}
