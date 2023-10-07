import { AbstractController } from './types/abstracts';
import ErrorProcessor from './utils/ErrorProcessor';
import Service from './Service';
import _1CService from './_1CService';
import MessageService from './MessageService';
import { FreezingTicketRequestBody } from './request-bodies/requestBodies';
import { ServerResponseMessage } from './types/enums';

export default class Controller extends ErrorProcessor implements AbstractController {
    private service: Service;
    private _1Cservice: _1CService;

    constructor(service: Service, _1Cservice: _1CService) {
        super();

        this.service = service;
        this._1Cservice = _1Cservice;
    }

    public getAllUserTickets = this.catchAsync(async (req, res, next) => {
        const _1CresponseData = await this._1Cservice.getAllUserTickets(req.cookies['user_token']);

        const responseDataToSend = this.service.createResponseBody(null, _1CresponseData);

        return res.status(200).json(responseDataToSend);
    });

    public getUserTicketById = this.catchAsync(async (req, res, next) => {
        const _1CresponseData = await this._1Cservice.getUserTicketById(req.params.id, req.cookies['user_token']);

        const responseDataToSend = this.service.createResponseBody(null, _1CresponseData);

        return res.status(200).json(responseDataToSend);
    });

    public activateTicketAndSendPaymentToCRM = this.catchAsync(async (req, res, next) => {
        const _1CresponseData = await this._1Cservice.activateTicket({
            activateTicketRequestBody: {},
        });

        await this.service.createPaymentThroughPaymentsMicroservice({});

        const responseDataToSend = this.service.createResponseBody(null, _1CresponseData);

        return res.status(200).json(responseDataToSend);
    });

    public freezeTicket = this.catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const { type, date, count } = req.body;
        const userToken = req.cookies['user_token'];

        const freezeTicketRequestBody = new FreezingTicketRequestBody(id, type, userToken, date, count);

        const _1CresponseData = await this._1Cservice.freezeTicket(freezeTicketRequestBody);

        const responseMessage = MessageService.createFreezeMessage(freezeTicketRequestBody);

        const responseDataToSend = this.service.createResponseBody(responseMessage, _1CresponseData);

        return res.status(201).json(responseDataToSend);
    });

    public unfreezeTicket = this.catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const { type, date, count } = req.body;
        const userToken = req.cookies['user_token'];

        const unfreezeTicketRequestBody = new FreezingTicketRequestBody(id, type, userToken, date, count);

        const _1CresponseData = await this._1Cservice.unfreezeTicket(unfreezeTicketRequestBody, userToken);

        const responseMessage = MessageService.createUnreezeMessage(unfreezeTicketRequestBody);

        const responseDataToSend = this.service.createResponseBody(responseMessage, _1CresponseData);

        return res.status(200).json(responseDataToSend);
    });

    public cancelUpcomingTicketFreezing = this.catchAsync(async (req, res, next) => {
        const { ticket_id, freeze_id } = req.params;

        const userToken = req.cookies['user_token'];

        await this._1Cservice.cancelUpcomingTicketFreezing(ticket_id, freeze_id, userToken);

        const responseDataToSend = this.service.createResponseBody(
            ServerResponseMessage.UPCOMING_FREEZING_IS_CANCELLED,
            null
        );

        return res.status(200).json(responseDataToSend);
    });
}
