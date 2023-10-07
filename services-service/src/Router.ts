import * as express from 'express';
import * as redis from 'redis';
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
        this.expressInstance.get(`${MicroserviceURL.SERVICES}`, this.controller.getAvailableServices);
        this.expressInstance.get(
            `${MicroserviceURL.SERVICE_PROVIDERS}`,
            this.controller.getServiceProvidersWithTheirServices
        );
        this.expressInstance.get(`${MicroserviceURL.AVAILABILITY}/dates`, this.controller.getAvailableDatesForService);
        this.expressInstance.get(
            `${MicroserviceURL.AVAILABILITY}/slots`,
            this.controller.getAvailableTimeSlotsOnSpecifiedDate
        );
        this.expressInstance.get(
            MicroserviceURL.PROVIDERS_PRICES_FOR_SERVICE,
            this.controller.getPricesByEmployeesForService
        );

        this.expressInstance
            .route(MicroserviceURL.APPOINTMENT)
            .get(this.controller.getAppointment)
            .delete(this.controller.cancelAppointment);

        this.expressInstance.post(MicroserviceURL.APPOINTMENTS, this.controller.appointForService);
    };

    public getExpressInstance = () => {
        return this.expressInstance;
    };
}
