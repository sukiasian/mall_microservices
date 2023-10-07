import Service from './Service';
import ErrorProcessor from './utils/ErrorProcessor';
import _1CService from './_1CService';
import { AbstractController } from './types/abstracts';
import {
    AppointmentRequestBody,
    CancelAppointmentQueryParams,
    GetAvailableDatesForServiceQueryParams,
    GetAvailableTimeSlotsQueryParams,
    GetPricesByEmployeesQueryParams,
    GetServicesQueryParams,
} from './types/interfaces';

export default class Controller extends ErrorProcessor implements AbstractController {
    private service: Service;
    private _1Cservice: _1CService;

    constructor(service: Service, _1Cservice: _1CService) {
        super();

        this.service = service;
        this._1Cservice = _1Cservice;
    }

    public getServiceProvidersWithTheirServices = this.catchAsync(async (req, res, next) => {
        const _1Cresponse = await this._1Cservice.getServiceProvidersWithTheirServices(
            req.query as GetServicesQueryParams,
			this.extractBearerToken(req.headers.authorization)
        );

        const responseBody = this.service.createResponseBody(null, _1Cresponse);

        res.status(200).json(responseBody);
    });

    public getAvailableServices = this.catchAsync(async (req, res, next) => {
        const _1Cresponse = await this._1Cservice.getAvailableServices(req.query as GetServicesQueryParams, this.extractBearerToken(req.headers.authorization));

        const responseBody = this.service.createResponseBody(null, _1Cresponse);

        res.status(200).json(responseBody);
    });

    public getAvailableDatesForService = this.catchAsync(async (req, res, next) => {
        const _1Cresponse = await this._1Cservice.getAvailableDatesForService({
            ...req.query,
            service_id: req.params.service_id
        } as GetAvailableDatesForServiceQueryParams, this.extractBearerToken(req.headers.authorization));

        const responseBody = this.service.createResponseBody(null, _1Cresponse);

        res.status(200).json(responseBody);
    });

    public getAvailableTimeSlotsOnSpecifiedDate = this.catchAsync(async (req, res, next) => {
        const _1Cresponse = await this._1Cservice.getAvailableTimeSlotsOnSpecifiedDate({
            ...req.query,
            service_id: req.params.service_id,
        } as GetAvailableTimeSlotsQueryParams, this.extractBearerToken(req.headers.authorization));

        const responseBody = this.service.createResponseBody(null, _1Cresponse);

        res.status(200).json(responseBody);
    });

    public getPricesByEmployeesForService = this.catchAsync(async (req, res, next) => {
        const _1Cresponse = await this._1Cservice.getPricesByEmployeesForService(
            {
                ...req.query,
                item_id: req.params.service_id,
            } as GetPricesByEmployeesQueryParams,
            this.extractBearerToken(req.headers.authorization)
        );

        const responseBody = this.service.createResponseBody(null, _1Cresponse);

        res.status(200).json(responseBody);
    });

    public getAppointment = this.catchAsync(async (req, res, next) => {
        const _1Cresponse = await this._1Cservice.getAppointment(
            req.params.appointment_id,
            this.extractBearerToken(req.headers.authorization)
        );

        const responseBody = this.service.createResponseBody(null, _1Cresponse);

        res.status(200).json(responseBody);
    });

    public appointForService = this.catchAsync(async (req, res, next) => {
        const _1Cresponse = await this._1Cservice.appointForService(
            req.params.appointment_id ?? (req.body as AppointmentRequestBody),
            this.extractBearerToken(req.headers.authorization)
        );

        const responseBody = this.service.createResponseBody(null, _1Cresponse);

        res.status(201).json(responseBody);
    });

    public cancelAppointment = this.catchAsync(async (req, res, next) => {
        const _1Cresponse = await this._1Cservice.cancelAppointment(
            req.query as CancelAppointmentQueryParams,
            this.extractBearerToken(req.headers.authorization)
        );

        const responseBody = this.service.createResponseBody(null, _1Cresponse);

        res.status(200).json(responseBody);
    });

    private extractBearerToken = (header: string): string => {
        return header.match(/(?<=Bearer ).*/) && header.match(/(?<=Bearer ).*/)[0];
    };
}
