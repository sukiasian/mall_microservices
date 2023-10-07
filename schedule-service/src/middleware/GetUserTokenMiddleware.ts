import * as axios from 'axios';
import Middleware from './Middleware';
import { NodeEnvironment } from '../types/enums';

export default class GetUserTokenMiddleware extends Middleware {
    private readonly HTTP_HEADERS = {
        'Content-Type': 'application/json',
    };
    private readonly AUTH_URL =
        process.env.NODE_ENV === NodeEnvironment.PRODUCTION ? 'http://auth:9000/token' : 'http://127.0.0.1:9000/token';

    public intercept = this.catchAsync(async (req, res, next) => {
        const userTokenResponse = await axios.default.get(this.AUTH_URL, {
            headers: { ...this.HTTP_HEADERS, Authorization: req.headers.authorization },
            validateStatus: () => true
        });

        if (userTokenResponse.data.data && userTokenResponse.data.data.usertoken) {
            res.locals.userToken = userTokenResponse.data.data.usertoken;
            res.locals.userId = userTokenResponse.data.data.userId;
        } else {
            res.locals.userToken = null;
            res.locals.userId = null;
        }

        next();
    });
}
