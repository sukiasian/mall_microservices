import { Address, AddressModel } from './models/Address';
import { AddressSchema, EditAddressFields } from './types/interfaces';

export default class Dao {
    private readonly ADDRESS = AddressModel.INSTANCE;

    public addNewAddress = async (data: AddressSchema) => {
        return this.ADDRESS.create(data);
    };

    public getUserDeliveryAddresses = async (userId: string): Promise<(typeof Address)[]> => {
        return this.ADDRESS.find({ userId });
    };

    public editAddress = async (addressId: string, data: EditAddressFields): Promise<any> => {
        return this.ADDRESS.findByIdAndUpdate(addressId, data, { new: true });
    };

    public deleteAddress = async (addressId: string): Promise<any> => {
        return this.ADDRESS.findByIdAndDelete(addressId);
    };
}
