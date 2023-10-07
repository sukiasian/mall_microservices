import { AbstractController } from './types/abstracts';
import ErrorProcessor from './utils/ErrorProcessor';
import Service from './Service';
import _1CService from './_1CService';

export default class Controller extends ErrorProcessor implements AbstractController {
    private service: Service;
    private _1Cservice: _1CService;

    constructor(service: Service, _1Cservice: _1CService) {
        super();

        this.service = service;
        this._1Cservice = _1Cservice;
    }

    public getUserVisitsAmount = this.catchAsync(async (req, res, next) => {
        const visitsAmount = await this._1Cservice.getUserVisits(res.locals.userToken);

        const responseBodyToSend = this.service.createResponseBody(null, { visits: visitsAmount });

        res.status(200).json(responseBodyToSend);
    });

    public getUser = this.catchAsync(async (req, res, next) => {
        const relevantUserData = await this.service.getUserData(req.headers.authorization, res.locals.userToken);

        const responseBodyToSend = this.service.createResponseBody(null, relevantUserData);

        res.status(200).json(responseBodyToSend);
    });
}
