import { BasicRequestHandler } from './types';

export abstract class AbstractApplication {
    public getExpressInstance: () => Express.Application;
    public configure?: () => void;
}

export abstract class AbstractRouter {
    public getExpressInstance: () => Express.Application;
}

export abstract class AbstractServer {
    public start: () => void;
    public close: () => void;
}

export abstract class AbstractController {
    getAvailableServices: BasicRequestHandler;
    getAvailableDatesForService: BasicRequestHandler;
    getAvailableTimeSlotsOnSpecifiedDate: BasicRequestHandler;
    getAppointment: BasicRequestHandler;
    appointForService: BasicRequestHandler;
    cancelAppointment: BasicRequestHandler;
    getPricesByEmployeesForService: BasicRequestHandler;
}

export abstract class AbstractMiddleware {
    static intercept: BasicRequestHandler;
    static interceptWithArgs?: BasicRequestHandler;

    intercept: BasicRequestHandler;
    interceptWithArgs?: BasicRequestHandler;
}
