import { ResponseStatus } from './enums';

export interface _1CServerResponse<T> {
    result: boolean;
    data: T;
}

export interface SignupDTO {
    phone: string;
    code: string;
    publicOfferAgreement: boolean;
    offersAndNewsReceivingAgreement?: boolean;
}

export interface ServerResponseBody<T> {
    status: ResponseStatus.SUCCESS;
    message?: string;
    data?: T;
}

export interface JWTPayload {
    userId: string;
}

export interface UserSchema {
    phone: string;
    password: string;
    usertoken: string;
    publicOfferAgreement: boolean;
    offersAndNewsReceivingAgreement: boolean;
    depositAccountId: string;
    bonusAccountId: string;

    hashPassword?: () => void;
    decipherPassword?: () => string;
}
