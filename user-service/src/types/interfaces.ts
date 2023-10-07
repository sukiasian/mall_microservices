import { CardType, ResponseStatus } from './enums';

export interface _1CServerResponse<T> {
    result: boolean;
    data: T;
}

export interface ServerResponseBody<T> {
    status: ResponseStatus.SUCCESS;
    message?: string;
    data?: T;
}

interface ClubEntity {
    id: string;
    name: string;
}
interface ManagerEntity {
    id: string;
    name: string;
    email: string;
    phone: string;
}
interface CardEntity {
    id: string;
    title: string;
    card_code: string;
    card_type: CardType;
    link: string;
}
interface PromocodeEntity {
    title: string;
    promocode: string;
}
interface UserTagEntity {
    id: string;
    title: string;
}
interface AppointmentToRateEntity {
    appointment_id: string;
    title: string;
    employee: {
        id: string;
        name: string;
    };
    start_date: string;
}

export interface GetUserInfoResponse {
    id: string;
    last_name: string;
    name: string;
    second_name: string;
    email: string;
    phone: string;
    birthday: string;
    sex: number;
    edit_allowed: boolean;
    club: ClubEntity;
    manager: ManagerEntity;
    cards: CardEntity[];
    promocodes: PromocodeEntity[];
    tags: UserTagEntity[];
    appointments_to_rate: AppointmentToRateEntity[];
}

export interface CreateUserBody {
    phone: string;
    password: string;
    last_name?: string;
    name?: string;
    second_name?: string;
    email?: string;
    birthday?: string; // "2017-08-20"
    promocode?: string;
    sex?: string; // "0", "1", "2"
    club_id?: string; // идентификатор клуба
    photo?: string; // base64
}

export interface UpdateUserBody {
    club_id?: string;
    do_not_disturbed?: boolean;
    email?: string;
    last_name?: string;
    name?: string;
    second_name?: string;
    birthday?: string;
    sex?: string;
    photo?: string;
}

export interface CreateUserResponse {
    user_token: string;
}

export interface UserSchema {
    phone: string;
    password: string;
    usertoken: string;
    publicOfferAgreement: boolean;
    offersAndNewsReceivingAgreement: boolean;

    hashPassword?: () => void;
    decipherPassword?: () => string;
}