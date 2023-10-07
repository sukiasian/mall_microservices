import * as express from 'express';
import * as http from 'http';
import basicLogger from './loggers/basicLogger';
import { ServerMessage } from './types/enums';

export class Server {
    private readonly app: express.Application;
    private readonly port: string | number;
    private expressInstance: http.Server;

    constructor(app: express.Application) {
        this.app = app;
        this.port = process.env.PORT;
    }

    public start = () => {
        this.expressInstance = this.app.listen(this.port, () => {
            basicLogger.info(
                `PARKING MICROSERVICE: ${ServerMessage.SERVER_IS_LISTENING_ON_SPECIFIED_PORT} ${this.port}`
            );
        });
    };

    public getExpressInstance = (): http.Server => {
        return this.expressInstance;
    };
}
