import Loggable from '../utils/Loggable';
import { AbstractMiddleware } from '../types/abstracts';
import { BasicRequestHandler } from '../types/types';

export default class Middleware extends Loggable implements AbstractMiddleware {
    public intercept: BasicRequestHandler;
}
