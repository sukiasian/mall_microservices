import { User, UserModel } from './User';
import { UserSchema } from './types/interfaces';

export default class Dao {
    private readonly USER = UserModel.INSTANCE;

    public getUserByPhone = async (phone: string): Promise<typeof User> => {
        return this.USER.findOne({ phone });
    };

    public getUserById = async (id: string): Promise<typeof User> => {
        return this.USER.findById(id);
    };

    public createUserInDB = async (userData: UserSchema): Promise<typeof User> => {
        return this.USER.create(userData);
    };
}
