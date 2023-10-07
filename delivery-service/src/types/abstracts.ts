import { BasicRequestHandler, CronJob } from './types';

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
    // getTree: BasicRequestHandler;
    // checkMarketAvailability: BasicRequestHandler;
    // getAllMarkets: BasicRequestHandler;
    // createOrder: BasicRequestHandler;
    // deleteOrder: BasicRequestHandler;
    // getOrder: BasicRequestHandler;
    // getOrderStatus: BasicRequestHandler;
    // precheck: BasicRequestHandler;
}

export abstract class AbstractMiddleware {
    static intercept: BasicRequestHandler;
    static interceptWithArgs?: BasicRequestHandler;

    intercept: BasicRequestHandler;
    interceptWithArgs?: BasicRequestHandler;
}

export abstract class AbstractCronJobs {
    public getJobs: () => CronJob[];
}

export abstract class AbstractCronExecutor {
    public schedule: () => void;
    public execute: () => void;
}
