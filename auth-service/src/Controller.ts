import { AbstractController } from './types/abstracts';
import { ServerErrorMessage, ServerResponseMessage, _1CApiURL } from './types/enums';
import ErrorProcessor from './utils/ErrorProcessor';
import _1CService from './_1CService';
import Service from './Service';
import AppError from './utils/AppError';
import UtilFunctions from './utils/UtilFunctions';

export default class Controller extends ErrorProcessor implements AbstractController {
    private service: Service;
    private _1Cservice: _1CService;

    constructor(service: Service, _1Cservice: _1CService) {
        super();

        this._1Cservice = _1Cservice;
        this.service = service;
    }

    public getPhoneConfirmationCode = this.catchAsync(async (req, res, next) => {
        const phone = req.query.phone as string;

        await this._1Cservice.getPhoneConfirmationCode(phone);

        const responseMessage = `Код подтверждения отправлен на номер +${phone}.`;
        const responseBodyToSend = this.service.createResponseBody(responseMessage, null);

        res.status(200).json(responseBodyToSend);
    });

    private registerUserAtSystems = async (
        phone: string,
        password: string,
        passToken: string,
        publicOfferAgreement: boolean,
        offersAndNewsReceivingAgreement: boolean
    ): Promise<string> => {
        const agreementsNotReceived =
            publicOfferAgreement === undefined || offersAndNewsReceivingAgreement === undefined;

        if (agreementsNotReceived) {
            throw new AppError(403, ServerErrorMessage.AGREEMENTS_ARE_NOT_RECEIVED);
        }

        const _1CsignupResponseData = await this._1Cservice.signupUser(phone, password, passToken);
        const userToken = _1CsignupResponseData.user_token;

        const depositAccountId = await this._1Cservice.getUserDepositAccountId(userToken);
        const bonusAccountId = await this._1Cservice.acquireAndGetBonusAccount(depositAccountId, phone, userToken);

        const userId = await this.service.createUserInDB(
            phone,
            password,
            _1CsignupResponseData.user_token,
            publicOfferAgreement,
            offersAndNewsReceivingAgreement,
            bonusAccountId,
            depositAccountId
        );

        return userId.toString();
    };

    public confirmPhone = this.catchAsync(async (req, res, next) => {
        const { phone, code } = req.body;
        const _1CConfirmCodeResponseData = await this._1Cservice.confirmPhone(phone, code);

        if (!_1CConfirmCodeResponseData.result) {
            throw new AppError(401, _1CConfirmCodeResponseData.error_message);
        }

        if (!res.locals.userExists) {
            const { phone, publicOfferAgreement, offersAndNewsReceivingAgreement } = req.body;

            const passToken = _1CConfirmCodeResponseData.data.pass_token;
            const password = await this.service.generateEncryptedPassword();

            const userId = await this.registerUserAtSystems(
                phone,
                password,
                passToken,
                publicOfferAgreement,
                offersAndNewsReceivingAgreement
            );

            const jwt = this.service.encodeJWT({ userId: userId });

            const responseBodyToSend = this.service.createResponseBody(ServerResponseMessage.PHONE_IS_CONFIRMED, {
                jwt,
            });

            return res.status(201).json(responseBodyToSend);
        } else {
            const jwt = this.service.encodeJWT({ userId: res.locals.userId });

            const responseBodyToSend = this.service.createResponseBody(ServerResponseMessage.PHONE_IS_CONFIRMED, {
                jwt,
            });

            res.status(200).json(responseBodyToSend);
        }
    });

    public getUserToken = this.catchAsync(async (req, res, next) => {
        const jwt = UtilFunctions.extractBearerToken(req.headers.authorization);
        const token = this.service.verifyAndDecodeJWT(jwt);
        const user = await this.service.getUserById(token.userId);

        const responseBodyToSend = this.service.createResponseBody(null, {
            usertoken: user.usertoken,
            phone: user.phone,
            userId: user.id,
            // bonusAccountId: user.bonusAccountId,
            // depositAccountId: user.depositAccountId,
        });

        res.status(200).json(responseBodyToSend);
    });
}
