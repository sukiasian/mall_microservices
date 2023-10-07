export enum NodeEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export enum ServerMessage {
    SERVER_IS_LISTENING_ON_SPECIFIED_PORT = 'Сервер прослушивается на порту',
}

export enum ServerResponseMessage {
    SUCCESSFUL_LOGIN = 'Вход выполнен.',
    PASSWORD_IS_SET = 'Пароль успешно установлен.',
    PHONE_IS_CONFIRMED = 'Номер телефона подтвержден.',
    USER_IS_CREATED = 'Пользователь создан.',
}

export enum ServerErrorMessage {
    SOMETHING_WENT_WRONG = 'Что-то пошло не так',
    ATTEMPTS_AMOUNT_EXCEEDED = 'Количество ',
    CORS = 'Запрещено правилами CORS.',
    INVALID_CONFIRMATION_CODE = 'Неверный код подтверждения.',
    INVALID_CODE_REQUEST = 'Ошибка отправки кода.',
    NOT_EXISTING_TABLES_CREATION_ERROR = 'Ошибка создания несуществующих таблиц.',
    AGREEMENTS_ARE_NOT_RECEIVED = 'Получены не все соглашения от пользователя.',
    USER_IS_NOT_FOUND = 'Пользователь не найден',
    TOKEN_IS_INVALID = 'Токен недействителен.',
}

export enum ValidationErrorMessage {
    PHONE_NUMBER_IS_INCORRECT = 'Пожалуйста, введите номер телефона в формате 7xxxxxxxxxx.',
    PASSWORD_IS_REQUIRED = 'Поле "Пароль" является необходимым.',
}

export enum MicroserviceURL {
    TOKEN = '/token',
    AUTH_CODE = '/auth_code',
    AGREEMENT = '/user_agreement',
    PUBLIC_OFFER = '/public_offer_agreement',
}

export enum _1CApiURL {
    GET_AUTH_TYPES = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/auth_types',
    SIGNUP_AND_AUTH = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/reg_and_auth_client',
    CONFIRM_PHONE = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/confirm_phone',
    LOGIN = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/auth_client',
    SET_PASSWORD = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/password',
    PASS_TOKEN = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/pass_token',
    AGREEMENT_FORM = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/agreement',
    PUBLIC_OFFER = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/public_offer',
    REQUEST_PHONE_CONFIRMATION = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/auth_request',

    GET_USER_DEPOSIT_ACCOUNTS = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/deposits',
    ACQUIRE_BONUS_ACCOUNT = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/payment',
    GET_BONUSES = 'https://chelweb2.1cbit.ru/base5_vnd/hs/api/v3/bonuses',
}

export enum ResponseStatus {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export enum RedisKey {
    SIGNUP_ATTEMPTS = 'signup:attempts',
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
