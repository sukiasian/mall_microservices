import * as express from 'express';
import * as redis from 'redis';
import UtilFunctions from '../utils/UtilFunctions';
import Middleware from './Middleware';
import { NodeEnvironment, RedisKey } from '../types/enums';

export default class RequestAttemptsLimiterMiddleware extends Middleware {
    private requestsAllowedPerDayForUser: string;
    private redisClient: redis.RedisClientType;
    private redisKey: RedisKey | string;
    private timeUntilReset: number;
    private currentAttempts: string | null;

    constructor(redisClient: redis.RedisClientType, redisKey: RedisKey) {
        super();

        this.redisClient = redisClient;
        this.redisKey = redisKey;

        this.requestsAllowedPerDayForUser = '150';
        this.redisClient = redisClient;
        this.redisKey = redisKey;
        this.timeUntilReset = process.env.NODE_ENV === NodeEnvironment.DEVELOPMENT ? 5 : 60 * 30;
    }

    private addIpToRedisKey = (ip: string) => {
        this.redisKey = `${this.redisKey}:${ip}`;
    };

    public intercept = this.catchAsync(async (req, res, next) => {
        this.addIpToRedisKey(req.ip);

        this.currentAttempts = await this.redisClient.get(this.redisKey as string);

        await this.logOnCatch(this.assignValueIfNull)(next);

        if (this.currentAttempts === null) {
            await this.logOnCatch(this.assignValueIfNull)();

            next();
        }

        await this.logOnCatch(this.handleAmountExceeded)();
        await this.logOnCatch(this.incrementCurrentRequestsAmount)();

        next();
    });

    private assignValueIfNull = async (): Promise<boolean | void> => {
        await this.redisClient.set(this.redisKey as string, '1');
    };

    private handleAmountExceeded = async (next: express.NextFunction): Promise<boolean | void> => {
        if (this.currentAttempts === this.requestsAllowedPerDayForUser) {
            await this.redisClient.setEx(
                this.redisKey as string,
                this.timeUntilReset,
                this.requestsAllowedPerDayForUser
            );

            // throw new AppError(403, ServerErrorMessage.ATTEMPTS_AMOUNT_EXCEEDED);
        }
    };

    private incrementCurrentRequestsAmount = async (): Promise<void> => {
        await this.redisClient.set(
            this.redisKey as string,
            `${UtilFunctions.makeDecimal(this.currentAttempts as string) + 1}`
        );
    };
}
