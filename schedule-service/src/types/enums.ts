export enum NodeEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export enum ServerMessage {
    SERVER_IS_LISTENING_ON_SPECIFIED_PORT = 'Сервер прослушиваетcя на порту ',
}

export enum ServerResponseMessage {}

// FIXME
export enum ServerErrorMessage {
    ATTEMPTS_AMOUNT_EXCEEDED = 'Attemtps amount exceeded. Please try again later.',
    CORS = 'Запрещено правилами CORS.',
    SOMETHING_WENT_WRONG = 'Что-то пошло не так.',
}

export enum ValidationErrorMessage {}

export enum MicroserviceURL {
    SCHEDULE = '/',
}

export enum _1CApiURL {
    GET_CLASSES = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/classes',
    GET_EMPLOYEE = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/employee',
}

export enum ResponseStatus {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export enum RedisKey {}
