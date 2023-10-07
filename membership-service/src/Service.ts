import * as axios from 'axios';
import { ResponseStatus } from './types/enums';
import { ServerResponseBody } from './types/interfaces';

export default class Service {
    // FIXME тип данных
    public createPaymentThroughPaymentsMicroservice = async (makePaymentData): Promise<ServerResponseBody<any>> => {
        // FIXME credentials
        const response = await axios.default.post('http://127.0.0.1:80/api/payments', makePaymentData);

        return response.data;
    };

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
}
