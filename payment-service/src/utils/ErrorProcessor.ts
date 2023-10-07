import * as axios from 'axios';
import { CatchAsyncHandler } from '../types/types';
import AppError from './AppError';
import UtilFunctions from './UtilFunctions';

export default class ErrorProcessor {
    protected static catchAsync: CatchAsyncHandler = (fn) => {
        return async (req, res, next) => {
            return fn(req, res, next).catch(next);
        };
    };

    protected catchAsync: CatchAsyncHandler = (fn) => {
        return ErrorProcessor.catchAsync(fn);
    };

    protected static throwAppErrorIfExists = (response: axios.AxiosResponse): void => {
        if (!UtilFunctions.checkIfResponseIsSuccessful(response.status)) {
            throw new AppError(response.status, response.data.message);
        }
    };

    protected throwAppErrorIfExists = (response: axios.AxiosResponse): void => {
        ErrorProcessor.throwAppErrorIfExists(response);
    };
}
