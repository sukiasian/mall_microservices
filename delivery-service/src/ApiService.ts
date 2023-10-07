import * as axios from 'axios';
import * as redis from 'redis';
import ErrorProcessor from './utils/ErrorProcessor';
import { ApiURL, RedisKey, ServerErrorMessage } from './types/enums';
import { LoginBody } from './types/interfaces';
import AppError from './utils/AppError';

export default class ApiService extends ErrorProcessor {
    private readonly redisClient: redis.RedisClientType;

    constructor(redisClient: redis.RedisClientType) {
        super();

        this.redisClient = redisClient;
    }

    private createHeaders = (token: string): axios.RawAxiosRequestHeaders => {
        if (!token) {
            throw new AppError(401, ServerErrorMessage.TOKEN_IS_NOT_FOUND);
        }

        return {
            Authorization: `Bearer ${token}`,
        };
    };

    public validateTable = (table: string) => {
        if (table && !table.match(/^(?:[1-9]|[1-9][0-9]|100)$/)) {
            throw new AppError(403, ServerErrorMessage.TABLE_NUMBER_SHOULD_CONTAIN_DIGITS_ONLY);
        }
    };

    public validateAddress = (address: string) => {
        if (address && address.length <= 5) {
            throw new AppError(403, ServerErrorMessage.ADDRESS_SHOULD_CONTAIN_AT_LEAST_5_CHARACTERS);
        }
    };

    public validateIfOnlyAddressOrTableAreSent = (table: string, address: string) => {
        if ((address && table) || (!address && !table)) {
            throw new AppError(403, ServerErrorMessage.ADDRESS_OR_TABLE);
        }
    };

    public login = async (): Promise<void | null> => {
        const credentials: LoginBody = {
            login: process.env.API_LOGIN,
            password: process.env.API_PASSWORD,
        };

        const token = (await axios.default.post(ApiURL.LOGIN, credentials)).data.token;

        if (!token) {
            return null;
        }

        this.redisClient.set(RedisKey.TOKEN, token);
    };

    public getAllMarkets = async () => {};

    public getRestaurantsForSpecifiedMarket = async (marketId: string, token: string) => {
        const res = await axios.default.get(`${ApiURL.GET_MARKETS}/${marketId}/tree`, {
            headers: { ...this.createHeaders(token) },
        });

        if (!res.data) {
            throw new AppError(500, ServerErrorMessage.SOMETHING_WENT_WRONG);
        }

        return res.data.outlets;
    };
}
