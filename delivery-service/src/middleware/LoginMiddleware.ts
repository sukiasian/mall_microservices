import * as redis from 'redis';
import Middleware from './Middleware';
import { RedisKey, ServerErrorMessage } from '../types/enums';
import AppError from '../utils/AppError';

export default class LoginMiddleware extends Middleware {
    private redisClient: redis.RedisClientType;

    constructor(redisClient: redis.RedisClientType) {
        super();

        this.redisClient = redisClient;
    }

    public intercept = this.catchAsync(async (req, res, next) => {
        const token = await this.redisClient.get(RedisKey.TOKEN);

        if (!token) {
            throw new AppError(401, ServerErrorMessage.TOKEN_IS_NOT_FOUND);
        }

        res.locals = {
            token,
        };

        next();
    });
}
