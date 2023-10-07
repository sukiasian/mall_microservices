import * as express from 'express';
import * as axios from 'axios';
import { NodeEnvironment } from './types/enums';
import AppError from './utils/AppError';

export class Router {
    private readonly instance: express.Router;
    private readonly HOST: string;
    private readonly PORT: number;

    constructor(host: string, port: number) {
        this.HOST = process.env.NODE_ENV === NodeEnvironment.PRODUCTION ? host : 'http://127.0.0.1';
        this.PORT = port;

        this.instance = express.Router();

        this.configure();
    }

    private configure = (): void => {
        this.instance.route('*').all(async (req, res) => {
            const authorizationHeader = req.headers.authorization;
            const options: axios.AxiosRequestConfig = {
                method: req.method,
                baseURL: `${this.HOST}:${this.PORT}${req.url}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                validateStatus: () => true,
            };

            if (authorizationHeader) {
                options.headers.Authorization = authorizationHeader;
            }

            try {
                const response = await axios.default.request(options);

                if (response.data.status === 'failure') {
                    throw new AppError(response.data.statusCode, response.data.message);
                }

                res.status(response.request.res.statusCode).json(response.data);
            } catch (err) {
                res.status(err.statusCode || 500).json({ message: err.message });
            }
        });
    };

    public getInstance = (): express.Router => {
        return this.instance;
    };
}
