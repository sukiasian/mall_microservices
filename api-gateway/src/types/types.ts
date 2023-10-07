import * as express from 'express';

export type AsyncRequestHandler<T> = (req: express.Request, res: express.Response, next: express.NextFunction) => T;
export type BasicRequestHandler = AsyncRequestHandler<Promise<express.Response | void>>;

export type CatchAsyncHandler = (fn: BasicRequestHandler) => AsyncRequestHandler<Promise<any>>;
