import * as axios from 'axios';
import ErrorProcessor from './utils/ErrorProcessor';
import { ServerErrorMessage, _1CApiURL } from './types/enums';
import { CreateUserBody, _1CServerResponse } from './types/interfaces';
import AppError from './utils/AppError';

export default class _1CService extends ErrorProcessor {
    private readonly AUTHORIZED_HTTP_HEADERS: axios.RawAxiosRequestHeaders = {
        'Content-Type': 'application/json',
        apikey: process.env.API_KEY,
    };

    constructor() {
        super();

        this.AUTHORIZED_HTTP_HEADERS.Authorization = `Basic ${this.encode1CLoginCredentialsInBase64()}`;
    }

    private encode1CLoginCredentialsInBase64 = (): string => {
        const { _1C_LOGIN, _1C_PASSWORD } = process.env;

        const buffer = Buffer.from(`${_1C_LOGIN}:${_1C_PASSWORD}`);
        const base64data = buffer.toString('base64');

        return base64data;
    };

    public getUserVisits = async (userToken: string) => {
        const response = await axios.default.get(_1CApiURL.VISITS_HISTORY, {
            headers: { ...this.AUTHORIZED_HTTP_HEADERS, usertoken: userToken },
            validateStatus: () => true,
        });

        if (response.status !== 200) {
            throw new AppError(500, ServerErrorMessage.SOMETHING_WENT_WRONG);
        }

        return response.data.data.length;
    };

    public getQrCode = async () => {
        // generate a qr code
    };
}
