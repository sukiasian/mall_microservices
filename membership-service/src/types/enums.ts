export enum NodeEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export enum ServerMessage {
    SERVER_IS_LISTENING_ON_SPECIFIED_PORT = 'Сервер прослушивается на порту',
}

export enum ServerResponseMessage {
    UPCOMING_FREEZING_IS_CANCELLED = 'Предстоящая заморозка отменена.',
}

export enum ServerErrorMessage {
    ATTEMPTS_AMOUNT_EXCEEDED = 'Превышено количество допустимым запросов. Пожалуйста, повторите позже.',
}

export enum ValidationErrorMessage {}

export enum MicroserviceURL {
    MEMBERSHIPS = '/',
    MEMBERSHIP = '/:id',
    MEMBERSHIP_ACTIVATION = '/:id/activation',
    FREEZING = '/:id/freezing',
}

export enum _1CApiUrl {
    GET_ALL_USER_TICKETS = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/tickets',
    GET_USER_TICKET_BY_ID = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/ticket',
    GET_USER_TICKET_MODIFIERS = 'https://app.1c.fitness/fitnessapi/hs/api/v3/modifiers_item',

    ACTIVATE_TICKET = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/activate_ticket',

    FREEZE_TICKET = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/freeze_ticket',
    UNFREEZE_TICKET = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/unfreeze_ticket',
    CANCEL_UPCOMING_TICKET_FREEZE = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/freeze_ticket',
}

export enum ResponseStatus {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export enum RedisKey {}

export enum TicketType {
    MEMBERSHIP = 'membership',
    PACKAGE = 'package',
}

export enum TicketName {
    MEMBERSHIP = 'Абонемент',
    PACKAGE = 'Пакет услуг',
}
