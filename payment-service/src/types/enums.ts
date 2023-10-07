export enum NodeEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export enum ServerMessage {
    SERVER_IS_LISTENING_ON_SPECIFIED_PORT = 'Сервер прослушивается на порту',
}

export enum ServerResponseMessage {}

export enum ServerErrorMessage {
    CORS = 'Запрещено правилами CORS.',
}

export enum ValidationErrorMessage {}

export enum MicroserviceURL {
    PAYMENT = '/',
    DEBTS = '/debts',
    DEBTS_PAYMENT = '/debts/payment',
    CART = '/cart',
    CARDS = '/cards',
}

export enum _1CApiURL {
    CART_COST = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/cart_cost',
    PAYMENT = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/payment',
    DEBTS = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/debts',
    DEBTS_PAYMENT = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/debts_payment',
    CREDIT_CARDS = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/credit_card',
}
// 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/'

export enum ResponseStatus {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export enum RedisKey {}

export enum AuthType {
    SMS = 'sms',
    WHATS_APP = 'whats_app',
    CALL = 'call',
}

export enum AuthTitle {
    SMS = 'SMS',
    WHATS_APP = 'WhatsApp',
    CALL = 'Звонок',
}
