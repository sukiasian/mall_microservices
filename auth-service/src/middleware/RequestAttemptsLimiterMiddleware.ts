import * as express from 'express';
import * as redis from 'redis';
import { ServerErrorMessage, NodeEnvironment, RedisKey } from '../types/enums';
import UtilFunctions from '../utils/UtilFunctions';
import AppError from '../utils/AppError';
import Middleware from './Middleware';

export default class RequestAttemptsLimiterMiddleware extends Middleware {
    private attemptsAllowed: string;
    private redisClient: redis.RedisClientType;
    private redisKey: RedisKey | string;
    private timeUntilReset: number;
    private currentAttempts: string | null;

    constructor(redisClient: redis.RedisClientType, redisKey: RedisKey) {
        super();

        this.redisClient = redisClient;
        this.redisKey = redisKey;

        this.attemptsAllowed = '10';
        this.redisClient = redisClient;
        this.redisKey = redisKey;
        this.timeUntilReset = process.env.NODE_ENV === NodeEnvironment.DEVELOPMENT ? 2 : 60 * 30;
    }

    private addIpToRedisKey = (ip: string) => {
        this.redisKey = `${this.redisKey}:${ip}`;
    };

    public intercept = this.catchAsync(async (req, res, next) => {
        this.addIpToRedisKey(req.ip);

        this.currentAttempts = await this.redisClient.get(this.redisKey);

        await this.logOnCatch()(this.assignValueIfNull)(next);
        await this.logOnCatch()(this.handleAmountExceeded)();
        await this.logOnCatch()(this.incrementCurrentRequestsAmount)();

        next();
    });

    public assignValueIfNull = async (next: express.NextFunction): Promise<boolean | void> => {
        if (this.currentAttempts === null) {
            await this.redisClient.set(this.redisKey, '1');

            next();
        }
    };

    public handleAmountExceeded = async (next: express.NextFunction): Promise<boolean | void> => {
        if (this.currentAttempts === this.attemptsAllowed) {
            await this.redisClient.setEx(this.redisKey, this.timeUntilReset, this.attemptsAllowed);

            throw new AppError(403, ServerErrorMessage.ATTEMPTS_AMOUNT_EXCEEDED);
        }
    };

    public incrementCurrentRequestsAmount = async (): Promise<void> => {
        await this.redisClient.set(this.redisKey, `${UtilFunctions.makeDecimal(this.currentAttempts as string) + 1}`);
    };
}
