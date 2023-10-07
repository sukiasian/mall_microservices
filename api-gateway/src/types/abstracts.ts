import { BasicRequestHandler } from './types';

export abstract class AbstractApplication {
    getInstance: () => Express.Application;
    configure?: () => void;
}

export abstract class AbstractRouter {
    getInstance: () => Express.Application;
}

export abstract class AbstractController {
    static redirectToTargetedMicroservice: BasicRequestHandler;
}

export abstract class AbstractServer {
    public start: () => void;
}

export abstract class AbstractMiddleware {
    static intercept: BasicRequestHandler;
    static interceptWithArgs?: BasicRequestHandler;

    intercept: BasicRequestHandler;
    interceptWithArgs?: BasicRequestHandler;
}
