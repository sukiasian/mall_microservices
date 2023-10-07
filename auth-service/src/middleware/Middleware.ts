import * as validator from 'validator';
import Loggable from '../utils/Loggable';
import { AbstractMiddleware } from '../types/abstracts';
import { BasicRequestHandler } from '../types/types';
import { ValidationErrorMessage } from '../types/enums';
import AppError from '../utils/AppError';

export default class Middleware extends Loggable implements AbstractMiddleware {
    protected validatePhone = (phone: string) => {
        if (!phone || !validator.default.matches(phone, /^[79]\d{10}$/)) {
            throw new AppError(403, ValidationErrorMessage.PHONE_NUMBER_IS_INCORRECT);
        }
    };

    public intercept: BasicRequestHandler;
}
