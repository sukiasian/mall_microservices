import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import GlobalErrorController from './error-controllers/GlobalErrorController';
import { AbstractApplication } from './types/abstracts';

export class Application implements AbstractApplication {
    private expressInstance: express.Application = null;
    private router: express.Router = null;

    constructor(router: express.Router) {
        this.expressInstance = express();
        this.router = router;

        this.configureApplication();
    }

    private configureApplication = (): void => {
        this.expressInstance.use(express.json({ limit: '10Kb' }));
        this.expressInstance.use(cookieParser());
        this.expressInstance.use('/', this.router);
        this.expressInstance.use(GlobalErrorController.handle);
    };

    public getExpressInstance = (): express.Application => {
        return this.expressInstance;
    };
}
