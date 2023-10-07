import { CatchAsyncHandler } from '../types/types';

export default class ErrorProcessor {
    protected static catchAsync: CatchAsyncHandler = (fn) => {
        return async (req, res, next) => {
            return fn(req, res, next).catch(next);
        };
    };

    protected catchAsync: CatchAsyncHandler = (fn) => {
        return ErrorProcessor.catchAsync(fn);
    };
}
