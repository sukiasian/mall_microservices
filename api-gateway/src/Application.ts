import * as express from 'express';
import * as cors from 'cors';
import RequestAttemptsLimiterMiddleware from './middleware/RequestAttemptsMiddleware';
import { AbstractApplication } from './types/abstracts';
import CorsConfig from './CorsConfig';
import { Router } from './Router';

export class Application implements AbstractApplication {
    private instance: express.Application;
    private requestAttemptsLimiterMW: RequestAttemptsLimiterMiddleware;

    constructor(requestAttemptsLimiterMW: RequestAttemptsLimiterMiddleware) {
        this.instance = express();
        this.requestAttemptsLimiterMW = requestAttemptsLimiterMW;

        this.configureRoutes();
    }

    private configureRoutes = (): void => {
        // FIXME leave 10 kb limit only in gateway!

        this.instance.use(cors(CorsConfig.options));
        this.instance.use(express.json({ limit: '10Kb' }));
        // this.instance.use(this.requestAttemptsLimiterMW.intercept);

        this.instance.use('/api/auth', new Router('http://auth', 9000).getInstance());
        this.instance.use('/api/delivery', new Router('http://delivery', 6000).getInstance());
        this.instance.use('/api/bonuses', new Router('http://bonuses', 3000).getInstance());
        this.instance.use('/api/parking', new Router('http://parking', 7000).getInstance());
        this.instance.use('/api/users', new Router('http://user', 7001).getInstance());
        this.instance.use('/api/payments', new Router('http://payment', 10000).getInstance());
        this.instance.use('/api/memberships', new Router('http://membership', 8003).getInstance());
        this.instance.use('/api/services', new Router('http://services', 4000).getInstance());
        this.instance.use('/api/schedule', new Router('http://schedule', 5000).getInstance());
    };

    public getInstance = (): express.Application => {
        return this.instance;
    };
}
