import { User, UserModel } from './User';
import { UserSchema } from './types/interfaces';

export default class Dao {
    private readonly USER = UserModel.INSTANCE;

    public getUserByUserToken = async (usertoken: string): Promise<typeof User> => {
        return this.USER.findOne({ usertoken });
    };

}
