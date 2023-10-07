export enum NodeEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export enum MicroserviceGate {
    AUTH = 'auth',
    BONUSES = 'bonuses',
    SERVICES = 'services',
    SCHEDULE = 'schedule',
    DELIVERY = 'delivery',
    PARKING = 'parking',
    PAYMENTS = 'payment',
    USERS = 'user',
    MEMBERSHIPS = 'membership',
}

export enum MicroservicePort {
    AUTH = 9000,
    BONUSES = 3000,
    SERVICES = 4000,
    SCHEDULE = 5000,
    DELIVERY = 6000,
    PARKING = 7000,
    PAYMENTS = 10000,
    USERS = 7001,
    MEMBERSHIPS = 8003,
}

export enum ServerMessage {
    SERVER_IS_LISTENING_ON_SPECIFIED_PORT = 'Сервер прослушивается на порту',
}

export enum ResponseStatus {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export enum ServerErrorMessage {
    ATTEMPTS_AMOUNT_EXCEEDED = 'Превышено допустимое количество запросов. Пожалуйста, повторите позднее.',
    TOKEN_IS_NOT_FOUND = 'Токен не найден: redis',
    CORS = 'Запрещено правилами CORS.',
    PAGE_IS_NOT_FOUND = 'Страница не найдена.',
}

export enum RedisKey {
    REQUEST_ATTEMPTS = 'request:attempts',
}
