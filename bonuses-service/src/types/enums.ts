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
    ATTEMPTS_AMOUNT_EXCEEDED = 'Attemtps amount exceeded. Please try again later.',
    SOMETHING_WENT_WRONG = 'Что-то пошло не так.',
}

export enum ValidationErrorMessage {}

export enum MicroserviceURL {
    BONUSES = '/',
    HISTORY = '/history',
}

export enum _1CApiUrl {
    BONUS_ACCOUNTS = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/bonuses',
    BONUS_HISTORY = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/bonus_history',
}
export enum ResponseStatus {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

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
