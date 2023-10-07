import * as express from 'express';
import * as http from 'http';
import * as redis from 'redis';
import { RedisKey, ServerMessage } from './types/enums';
import { AbstractServer } from './types/abstracts';
import basicLogger from './loggers/basicLogger';
import ApiService from './ApiService';

export class Server implements AbstractServer {
    private readonly app: express.Application = null;
    private readonly port: string | number = null;
    private expressInstance: http.Server;
    private redisClient: redis.RedisClientType;
    private apiService: ApiService;

    constructor(app: express.Application, redisClient: redis.RedisClientType, apiService: ApiService) {
        this.app = app;
        this.redisClient = redisClient;
        this.apiService = apiService;

        this.port = process.env.PORT;
    }

    private listen = (): void => {
        this.expressInstance = this.app.listen(this.port, () => {
            basicLogger.info(
                `DELIVERY MICROSERVICE: ${ServerMessage.SERVER_IS_LISTENING_ON_SPECIFIED_PORT} ${this.port}`
            );
        });
    };

    private acquireTokenIfUndefined = async (): Promise<void> => {
        if (!this.redisClient.get(RedisKey.TOKEN)) {
            await this.apiService.login();
        }
    };

    public start = (): void => {
        this.acquireTokenIfUndefined();
        this.listen();
    };

    public close = () => {
        this.expressInstance.close();
    };

    public getExpressInstance = (): http.Server => {
        return this.expressInstance;
    };
}
