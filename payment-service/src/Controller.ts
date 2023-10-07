import Service from "./Service";
import _1CService from "./_1CService";
import ErrorProcessor from "./utils/ErrorProcessor";
import { AbstractController } from "./types/abstracts";

export default class Controller extends ErrorProcessor implements AbstractController {
    private service: Service;
    private _1Cservice: _1CService;

    constructor(service: Service, _1Cservice: _1CService) {
        super();

        this.service = service;
        this._1Cservice = _1Cservice;
    }

    public getClientDebts = this.catchAsync(async (req, res, next) => {
        const debtAmount = await this._1Cservice.getClientDebts(res.locals.userToken);

        const responseDataToSend = this.service.createResponseBody(null, {
            credit: debtAmount,
        });

        return res.status(200).json(responseDataToSend);
    });
}
