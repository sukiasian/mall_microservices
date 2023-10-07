import * as axios from 'axios';
import * as sha256 from 'sha256';
import { _1CApiURL } from './types/enums';
import ErrorProcessor from './utils/ErrorProcessor';

export default class _1CService extends ErrorProcessor {
    private readonly authorizedHttpHeaders: axios.RawAxiosRequestHeaders = {
        'Content-Type': 'application/json',
        apikey: process.env.API_KEY,
    };

    constructor() {
        super();

        this.authorizedHttpHeaders.Authorization = `Basic ${this.encode1CLoginCredentialsInBase64()}`;
    }

    private encode1CLoginCredentialsInBase64 = (): string => {
        const { _1C_LOGIN, _1C_PASSWORD } = process.env;

        const buffer = Buffer.from(`${_1C_LOGIN}:${_1C_PASSWORD}`);
        const base64data = buffer.toString('base64');

        return base64data;
    };
}
