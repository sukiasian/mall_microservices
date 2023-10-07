import { BasicRequestHandler, CatchAsyncHandler } from './types';

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

export abstract class AbstractController {}

export abstract class AbstractMiddleware {
    intercept: BasicRequestHandler;
    interceptWithArgs?: BasicRequestHandler;
    static intercept: BasicRequestHandler;
    static interceptWithArgs?: BasicRequestHandler;
}
