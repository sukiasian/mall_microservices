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

interface QueryParams {
    [key: string]: any;
}

export interface GetUpcomingSaunaSteamsResponse {}

export interface GetUpcomingSaunaSteamsParams extends QueryParams {
    club_id: string;
    start_date?: string;
    end_date?: string;
    service_id?: string;
    room_id?: string;
}
