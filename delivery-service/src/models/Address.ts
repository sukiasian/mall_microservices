import * as mongoose from 'mongoose';
import { AddressSchema } from '../types/interfaces';

export class AddressModel {
    private static readonly SCHEMA = new mongoose.Schema<AddressSchema>(
        {
            street: {
                type: String,
                required: [true, 'Поле "Улица" является обязательным.'],
            },

            building: {
                type: String,
                required: [true, 'Поле "Номер здания" является обязательным.'],
            },

            apt: Number,
            entrance: Number,
            floor: Number,
            userId: String,
        },
        { versionKey: false }
    );

    public static readonly INSTANCE = mongoose.model(AddressModel.name, this.SCHEMA);
}

export const Address = new AddressModel.INSTANCE();
