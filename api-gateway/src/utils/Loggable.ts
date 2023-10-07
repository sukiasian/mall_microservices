import basicLogger from '../loggers/basicLogger';
import ErrorProcessor from './ErrorProcessor';

export default class Loggable extends ErrorProcessor {
    protected static logOnCatch = (fn) => {
        return async (...props: any) => {
            fn(...props).catch(basicLogger.error);
        };
    };

    protected logOnCatch = (fn) => {
        return Loggable.logOnCatch(fn);
    };
}
