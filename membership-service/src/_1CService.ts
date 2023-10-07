import * as axios from 'axios';
import { _1CApiUrl } from './types/enums';
import * as sha256 from 'sha256';
import ErrorProcessor from './utils/ErrorProcessor';
import {
    ActivateTicketResponseData,
    FreezeTicketResponseData,
    GetAllUserTicketsResponseData,
    GetUserTicketByIdResponseData,
    UnfreezeTicketResponseData,
    _1CServerResponse,
} from './types/interfaces';
import { FreezingTicketRequestBody } from './request-bodies/requestBodies';

export default class _1CService extends ErrorProcessor {
    private readonly authorizedHttpHeaders: axios.RawAxiosRequestHeaders = {
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

    public getAllUserTickets = async (userToken: string): Promise<GetAllUserTicketsResponseData> => {
        const _1Cresponse = await axios.default.get(_1CApiUrl.GET_ALL_USER_TICKETS, {
            headers: {
                ...this.authorizedHttpHeaders,
                usertoken: userToken,
            },
        });

        return _1Cresponse.data;
    };

    public getUserTicketById = async (
        membershipOrVisitId: string,
        userToken: string
    ): Promise<GetUserTicketByIdResponseData> => {
        const _1Cresponse = await axios.default.get(`${_1CApiUrl.GET_USER_TICKET_BY_ID}/${membershipOrVisitId}`, {
            headers: {
                ...this.authorizedHttpHeaders,
                usertoken: userToken,
            },
        });

        return _1Cresponse.data;
    };

    public activateTicket = async ({ activateTicketRequestBody }): Promise<ActivateTicketResponseData> => {
        const activateTicketResponse = await axios.default.post(
            `${_1CApiUrl.ACTIVATE_TICKET}`,
            activateTicketRequestBody,
            { headers: { ...this.authorizedHttpHeaders, usertoken: activateTicketRequestBody.usertoken } }
        );

        return activateTicketResponse.data;
    };

    public freezeTicket = async ({
        ticketId,
        date,
        count,
        usertoken,
    }: FreezingTicketRequestBody): Promise<GetAllUserTicketsResponseData> => {
        const _1Cresponse = await axios.default.post(
            `${_1CApiUrl.FREEZE_TICKET}/${ticketId}`,
            { ticketId, date, count },
            {
                headers: {
                    ...this.authorizedHttpHeaders,
                    usertoken,
                },
            }
        );

        return _1Cresponse.data;
    };
    public unfreezeTicket = async (
        { ticketId, date }: FreezingTicketRequestBody,
        userToken: string
    ): Promise<UnfreezeTicketResponseData> => {
        const _1Cresponse = await axios.default.put(
            `${_1CApiUrl.UNFREEZE_TICKET}`,
            { ticketId, date },
            {
                headers: {
                    ...this.authorizedHttpHeaders,
                    usertoken: userToken,
                },
            }
        );

        return _1Cresponse.data;
    };

    public cancelUpcomingTicketFreezing = async (
        ticketId: string,
        freezeId: string,
        userToken: string
    ): Promise<FreezeTicketResponseData> => {
        const _1Cresponse = await axios.default.delete(_1CApiUrl.CANCEL_UPCOMING_TICKET_FREEZE, {
            headers: {
                ...this.authorizedHttpHeaders,
                usertoken: userToken,
            },
            params: {
                ticket_id: ticketId,
                freeze_id: freezeId,
            },
        });

        return _1Cresponse.data;
    };
}
