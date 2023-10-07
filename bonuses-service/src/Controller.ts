import { AbstractController } from './types/abstracts';
import ErrorProcessor from './utils/ErrorProcessor';
import Service from './Service';
import _1CService from './_1CService';
import UtilFunctions from './utils/UtilFunctions';

export default class Controller extends ErrorProcessor implements AbstractController {
    private service: Service;
    private _1Cservice: _1CService;

    constructor(service: Service, _1Cservice: _1CService) {
        super();

        this.service = service;
        this._1Cservice = _1Cservice;
    }

    public getUserBonusesInformation = this.catchAsync(async (req, res, next) => {
        const data = await this._1Cservice.getUserBonusesInformation(res.locals.userToken, req.headers.authorization);

        const responseBodyToSend = this.service.createResponseBody(null, data);

        res.status(200).json(responseBodyToSend);
    });
}
