import { ResponseStatus } from './enums';

export interface _1CServerResponse<T> {
    result: boolean;
    data: T;
}

export interface ServerResponseBody<T> {
    status: ResponseStatus.SUCCESS;
    message?: string;
    data?: T;
}
