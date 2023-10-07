import * as crypto from 'crypto';
import * as mongoose from 'mongoose';
import { UserSchema } from './types/interfaces';

class Hash {
    public static readonly ALGORITHM = 'aes-256-gcm';
    public static readonly INIT_VECTOR = crypto.randomBytes(16);
    public static readonly SECRET_KEY = crypto.randomBytes(32);
}

export class UserModel {
    private static readonly SCHEMA = new mongoose.Schema<UserSchema>({
        phone: {
            type: String,
            required: [true, 'Поле "phone" является обязательным.'],
        },

        password: {
            type: String,
            required: [true, 'Поле "password" является обязательным.'],
        },

        usertoken: {
            type: String,
            required: [true, 'Поле "usertoken" является обязательным.'],
        },

        publicOfferAgreement: {
            type: Boolean,
            required: [true, 'Поле "publicOfferAgreement" является обязательным.'],
        },

        offersAndNewsReceivingAgreement: {
            type: Boolean,
            required: [true, 'Поле "offersAndNewsReceivingAgreement" является обязательным.'],
        },
    });

    public static readonly INSTANCE = mongoose.model(UserModel.name, this.SCHEMA);

    private static setHooks = (): void => {
        this.SCHEMA.pre('save', function () {
            this.hashPassword();
        });

        this.SCHEMA.post('findOne', function () {});
    };

    private static setMethods = (): void => {
        this.SCHEMA.methods.hashPassword = function () {
            const cipher = crypto.createCipheriv(Hash.ALGORITHM, Hash.SECRET_KEY, Hash.INIT_VECTOR);

            this.password = cipher.update(this.password, 'utf-8', 'hex');

            this.password += cipher.final('hex');
        };

        this.SCHEMA.methods.decipherPassword = function () {
            const decipher = crypto.createDecipheriv(Hash.ALGORITHM, Hash.SECRET_KEY, Hash.INIT_VECTOR);

            return decipher.update(this.password, 'hex', 'utf-8');
        };
    };

    static {
        this.setMethods();
        this.setHooks();
    }
}

export const User = new UserModel.INSTANCE();
