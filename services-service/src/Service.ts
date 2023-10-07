import { ResponseStatus } from './types/enums';
import { ServerResponseBody } from './types/interfaces';

export default class Service {
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
