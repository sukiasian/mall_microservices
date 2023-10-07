import { CorsOptions } from 'cors';
import basicLogger from './loggers/basicLogger';
import AppError from './utils/AppError';
import { ServerErrorMessage } from './types/enums';

export default class CorsConfig {
    public static readonly options: CorsOptions = {
        origin: function (origin, callback) {
            if (!origin || CorsConfig.whiteList.indexOf(origin) !== -1) {
                basicLogger.info(origin);

                callback(null, true);
            } else {
                basicLogger.error(origin);

                callback(new AppError(403, ServerErrorMessage.CORS));
            }
        },
    };

    private static readonly whiteList: string[] = ['127.0.0.1'];
}
