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
    // public getUserByUserToken: BasicRequestHandler;
    // public getQRCode: BasicRequestHandler;
    // public createUser: BasicRequestHandler;
    // public updateUser: BasicRequestHandler;
    // // NOTE probably should be at Parking Service
    // public getLicensePlate?: BasicRequestHandler;
    // public addLicensePlate?: BasicRequestHandler;
    // public deleteLicensePlate?: BasicRequestHandler;
}

export abstract class AbstractMiddleware {
    static intercept: BasicRequestHandler;
    static interceptWithArgs?: BasicRequestHandler;

    intercept: BasicRequestHandler;
    interceptWithArgs?: BasicRequestHandler;
}
