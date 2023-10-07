export enum NodeEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export enum ServerMessage {
    SERVER_IS_LISTENING_ON_SPECIFIED_PORT = 'Сервер прослушивается на порту',
}

export enum ServerResponseMessage {
    CLIENT_IS_CREATED = 'Пользователь успешно создан.',
    CLIENT_IS_UPDATED = 'Пользователь успешно обновлен',
}

export enum ServerErrorMessage {
    ATTEMPTS_AMOUNT_EXCEEDED = 'Превышено допустимое количество запросов. Пожалуйста, повторите позже.',
    SOMETHING_WENT_WRONG = 'Что-то пошло не так.',
}

export enum ValidationErrorMessage {}

export enum _1CApiURL {
    CLIENT = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/client',
    VISITS_HISTORY = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/visits_history',
}

export enum MicroserviceURL {
    USERS = '/',
    QR = '/qr',
    CARS = '/cars',
    VISITS = '/visits',
    DEBTS = '/debts',
    GUEST_VISITS = '/visits/guests',
    RELATIVES = '/relatives',
}

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

export enum CardType {
    ELECTRONIC = 'electronic',
    BARCODE = 'barcode',
    MAGNETIC = 'magnetic',
}
