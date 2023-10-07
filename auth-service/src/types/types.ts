import * as express from 'express';
import * as mongoose from 'mongoose';
import { ResponseStatus } from './enums';
import { UserSchema } from './interfaces';

export type AsyncRequestHandler<T> = (req: express.Request, res: express.Response, next: express.NextFunction) => T;
export type BasicRequestHandler = AsyncRequestHandler<Promise<express.Response | void>>;

export type CatchAsyncHandler = (fn: BasicRequestHandler) => AsyncRequestHandler<Promise<any>>;

export type GlobalErrorHandler = (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => void;

export type ResponseStatusDefiner = (httpStatus: number) => ResponseStatus;
