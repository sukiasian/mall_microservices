export enum NodeEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export enum ServerMessage {
    SERVER_IS_LISTENING_ON_SPECIFIED_PORT = 'Сервер прослушивает на порту',
}

export enum ServerResponseMessage {
    ORDER_IS_CREATED = 'Заказ успешно создан!',
    ORDER_IS_DELETED = 'Заказ успешно отменен.',
    ADDRESS_IS_ADDED = 'Адрес добавлен.',
}

export enum ServerErrorMessage {
    SOMETHING_WENT_WRONG = 'Что-то пошло не так.',
    ATTEMPTS_AMOUNT_EXCEEDED = 'Превышено допустимое количество запросов. Пожалуйста, повторите позднее.',
    TOKEN_IS_NOT_FOUND = 'Токен не найден: redis',
    CORS = 'Not allowed by CORS.',
    ADDRESS_OR_TABLE = 'Укажите только адрес или номер столика.',
    TABLE_NUMBER_SHOULD_CONTAIN_DIGITS_ONLY = 'Номер столика должен содержать только цифры от 1 до 100',
    TABLE_NUMBER_SHOULD_NOT_BE_EMPTY = 'Номер столика не должен быть пустым.',
    WRONG_TABLE_NUMBER = 'Неправильный номер столика',
    ADDRESS_SHOULD_CONTAIN_AT_LEAST_5_CHARACTERS = 'Адрес должен содержать не менее 5 символов.',
    ADDRESS_IS_UPDATED = 'Адрес обновлен.',
    ADDRESS_IS_DELETED = 'Адрес удален.',
}

export enum ValidationErrorMessage {}

export enum MicroserviceURL {
    RESTAURANTS = '/restaurants',
    RESTAURANT = '/restaurants/:id',
    MARKETS = '/markets',
    ORDERS = '/orders',
    ORDER = '/order/:id',
    ADDRESSES = '/addresses',
    ADDRESS = '/addresses/:id',
}

export enum ApiURL {
    LOGIN = 'https://development.hungry.ninja/api/consumer/login',
    CHECK_MARKET_AVAILABILITY = 'https://development.hungry.ninja/api/consumer/markets/:id/availability',
    GET_MARKETS = 'https://development.hungry.ninja/api/consumer/markets',
    CREATE_ORDER = 'https://development.hungry.ninja/api/consumer/order',
    PRECHECK = 'https://development.hungry.ninja/api/consumer/precheck',
    GET_ORDER_STATUS = 'https://development.hungry.ninja/api/consumer/order/:id/status',
    DELETE_ORDER = 'https://development.hungry.ninja/api/consumer/order/:id',
    GET_ORDER = 'https://development.hungry.ninja/api/consumer/order/:id',
}

export enum ResponseStatus {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export enum RedisKey {
    TOKEN = 'token',
}

export enum OptionGroupType {
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    TAKEAWAY = 'takeaway',
    QUANTITIVE = 'quantitive',
}
