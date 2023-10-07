export enum NodeEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export enum ServerMessage {
    SERVER_IS_LISTENING_ON_SPECIFIED_PORT = 'Сервер прослушивается на порту',
}

export enum ServerResponseMessage {
    SERVICE_IS_APPOINTED = 'Запись на услугу прошла успешно!',
}

export enum ServerErrorMessage {
    ATTEMPTS_AMOUNT_EXCEEDED = 'Attemtps amount exceeded. Please try again later.',
}

export enum ValidationErrorMessage {}

export enum MicroserviceURL {
    SERVICES = '/',
    AVAILABILITY = '/:service_id/availability',
    SERVICE_PROVIDERS = '/:service_id/providers',
    PROVIDERS_PRICES_FOR_SERVICE = '/:service_id/providers/prices',
    APPOINTMENTS = '/:service_id/appointments',
    APPOINTMENT = '/appointments/:appointment_id',
}

export enum _1CApiURL {
    GET_AVAILABLE_SERVICES = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/appointment_services',
    GET_SERVICE_PROVIDERS_WITH_THEIR_SERVICES = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/appointment_trainers',
    GET_AVAILABLE_DATES_FOR_SERVICE = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/appointment_dates',
    GET_AVAILABLE_TIME_SLOTS_FOR_SERVICE = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/appointment_times',
    GET_PRICES_PER_EMPLOYEES_FOR_SERVICE = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/employee_choice',

    GET_APPOINTMENT = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/appointment',
    APPOINT_FOR_SERVICE = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/appointment',
    CANCEL_APPOINTMENT = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/appointment',
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
