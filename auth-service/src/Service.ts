import * as jwt from 'jsonwebtoken';
import { generate } from 'generate-password';
import Dao from './Dao';
import { ResponseStatus, ServerErrorMessage } from './types/enums';
import { JWTPayload, ServerResponseBody } from './types/interfaces';
import AppError from './utils/AppError';
import { User } from './User';

export default class Service {
    private dao: Dao;

    constructor(dao: Dao) {
        this.dao = dao;
    }

    public createResponseBody = <T = any>(message?: string, data?: T) => {
        const resBody: ServerResponseBody<T> = {
            status: ResponseStatus.SUCCESS,
        };

        if (message) {
            resBody.message = message;
        }

        if (data) {
            resBody.data = data;
        }

        return resBody;
    };

    public getUserByPhone = async (phone: string): Promise<typeof User> => {
        return this.dao.getUserByPhone(phone);
    };

    public getUserById = async (id: string): Promise<typeof User> => {
        return this.dao.getUserById(id);
    };

    public verifyConfirmationCode = (code: string): boolean => {
        // Сверить код через будущий сервис

        return true;
    };

    public createUserInDB = async (
        phone: string,
        password: string,
        userToken: string,
        publicOfferAgreement: boolean,
        offersAndNewsReceivingAgreement: boolean,
        depositAccountId: string,
        bonusAccountId: string
    ) => {
        const user = await this.dao.createUserInDB({
            phone,
            password,
            usertoken: userToken,
            publicOfferAgreement,
            offersAndNewsReceivingAgreement,
            depositAccountId,
            bonusAccountId,
        });

        return user._id;
    };

    public getCodeForConfirmedUser = async (phone: string): Promise<void> => {
        // отправить код через будущий сервис

        return;
    };

    public generateEncryptedPassword = async (): Promise<string> => {
        return generate({ numbers: true, length: 12 });
    };

    public encodeJWT = (payload?: JWTPayload) => {
        const { JWT_SECRET_KEY, JWT_ISSUER, JWT_EXPIRATION_PERIOD } = process.env;

        return jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: JWT_EXPIRATION_PERIOD,
            issuer: JWT_ISSUER,
        });
    };

    public verifyAndDecodeJWT = (token: string): jwt.JwtPayload => {
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY) as jwt.JwtPayload;
        } catch (err) {
            throw new AppError(401, ServerErrorMessage.TOKEN_IS_INVALID);
        }
    };
}
