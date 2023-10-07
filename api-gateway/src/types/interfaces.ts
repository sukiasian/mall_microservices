import { ResponseStatus } from './enums';

export interface ServerResponseBody<T> {
    status: ResponseStatus.SUCCESS;
    message?: string;
    data?: T;
}
