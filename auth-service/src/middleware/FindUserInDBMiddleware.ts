import Middleware from './Middleware';
import { UserModel } from '../User';

export default class FindUserInDBMiddleware extends Middleware {
    private readonly USER = UserModel.INSTANCE;

    public intercept = this.catchAsync(async (req, res, next) => {
        const phone = req.query.phone || req.body.phone;

        this.validatePhone(phone);

        const user = await this.USER.findOne({ phone });

        if (user) {
            res.locals.userExists = true;
            res.locals.userId = user._id;
        }

        next();
    });
}
