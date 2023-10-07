import { ResponseStatus } from '../types/enums';

export default class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    public status: string;

    constructor(statusCode: number, message: string) {
        super(message);

        this.statusCode = statusCode;
        this.status = this.defineResponseStatus(statusCode);
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

    private defineResponseStatus = (httpStatus: number): ResponseStatus => {
        if (httpStatus >= 200 && httpStatus < 400) {
            return ResponseStatus.SUCCESS;
        } else if (httpStatus >= 400) {
            return ResponseStatus.FAILURE;
        }

        return ResponseStatus.FAILURE;
    };
}
