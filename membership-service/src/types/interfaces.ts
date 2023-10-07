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

export interface GetAllUserTicketsResponseData extends ServerResponseBody<{}> {}

export interface GetUserTicketByIdResponseData extends ServerResponseBody<{}> {}

export interface GetTicketModifiersResponseData extends ServerResponseBody<{}> {}

export interface ActivateTicketRequestBody {
    ticket_id: string;
    date: string;
}

export interface ActivateTicketResponseData extends ServerResponseBody<{}> {}

export interface FreezeTicketResponseData extends ServerResponseBody<{}> {}

export interface UnfreezeTicketResponseData extends ServerResponseBody<{}> {}

export interface CancelUpcomingFreezingResponseData extends ServerResponseBody<{}> {}
