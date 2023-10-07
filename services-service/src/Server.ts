import * as express from 'express';
import * as http from 'http';
import { ServerMessage } from './types/enums';
import { AbstractServer } from './types/abstracts';
import basicLogger from './loggers/basicLogger';

export class Server implements AbstractServer {
    private readonly app: express.Application = null;
    private readonly port: string | number = null;
    private expressInstance: http.Server;

    constructor(app: express.Application) {
        this.app = app;

        this.port = process.env.PORT;
    }

    public start = () => {
        this.expressInstance = this.app.listen(this.port, () => {
            basicLogger.info(`SERVICES MICROSERVICE: ${ServerMessage.SERVER_IS_LISTENING_ON_SPECIFIED_PORT} ${this.port}`);
        });
    };

    public close = () => {
        this.expressInstance.close();
    };

    public getExpressInstance = (): http.Server => {
        return this.expressInstance;
    };
}
