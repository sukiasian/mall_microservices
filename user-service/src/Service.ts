import * as axios from 'axios';
import { NodeEnvironment, ResponseStatus } from './types/enums';
import { ServerResponseBody } from './types/interfaces';
import Dao from './Dao';
import { User } from './User';
import parsePhoneNumber from 'libphonenumber-js';

export default class Service {
    private readonly BONUSES_HOST =
        process.env.NODE_ENV === NodeEnvironment.PRODUCTION ? 'http://bonuses:3000' : 'http://127.0.0.1:3000';
    private readonly PAYMENT_HOST =
        process.env.NODE_ENV === NodeEnvironment.PRODUCTION ? 'http://payment:10000' : 'http://127.0.0.1:10000';

    private dao: Dao;

    constructor(dao: Dao) {
        this.dao = dao;
    }
    public createResponseBody = <T = any>(message?: string, data?: T) => {
        const resBody: ServerResponseBody<T> = {
            status: ResponseStatus.SUCCESS,
        };

        if (message) {
            resBody.message = message;
        }

        if (data) {
            resBody.data = data;
        }

        return resBody;
    };

    private getUserByUserToken = async (usertoken: string): Promise<typeof User> => {
        return this.dao.getUserByUserToken(usertoken);
    };

    private convertPhoneForProfile = (phone: string): string => {
        const phoneNumber = parsePhoneNumber(phone, 'RU');

        return phoneNumber.formatInternational();
    };

    public getUserData = async (authHeader: string, userToken: string) => {
        const user = await this.getUserByUserToken(userToken);

        const bonusesResponse = await axios.default.get(this.BONUSES_HOST, { headers: { Authorization: authHeader } });
        const debtsResponse = await axios.default.get(`${this.PAYMENT_HOST}/debts`, {
            headers: { Authorization: authHeader },
        });

        return {
            ...bonusesResponse.data.data,
            ...debtsResponse.data.data,
            phone: this.convertPhoneForProfile(user.phone),
        };
    };
}
