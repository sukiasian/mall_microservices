import Dao from './Dao';
import { Address } from './models/Address';
import { ResponseStatus } from './types/enums';
import { AddressSchema, EditAddressFields, ServerResponseBody } from './types/interfaces';

export default class Service {
    private dao: Dao;

    constructor(dao: Dao) {
        this.dao = dao;
    }

    public createResponseBody = <T = any>(message?: string, data?: T) => {
        const resBody: ServerResponseBody<T> = {
            status: ResponseStatus.SUCCESS,
        };

        if (message) {
            resBody.message = message;
        }

        if (data) {
            resBody.data = data;
        }

        return resBody;
    };

    public processRestaurants = (restaurants) => {
        const processedData = [];

        for (const restaurant of restaurants) {
            processedData.push({
                id: restaurant.id,
                title: restaurant.title,
                subtitle: restaurant.subtitle,
                image: restaurant.image,
            });
        }

        return processedData;
    };

    public retrieveRestaurantMenuCategoriesFromRestaurant = (restaurants, restaurantId: string) => {
        return restaurants.filter((restaurant) => restaurant.id === parseInt(restaurantId, 10))[0].categories;
    };

    public processRestaurantMenu = (menuCategories) => {
        const processedData = [];

        for (const category of menuCategories) {
            const processedProducts = [];

            for (const product of category.products) {
                processedProducts.push({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    price: parseFloat(product.price),
                });
            }

            processedData.push({
                id: category.id,
                title: category.title,
                products: processedProducts,
            });
        }

        return processedData;
    };

    public addNewAddress = async (data: AddressSchema): Promise<typeof Address> => {
        return this.dao.addNewAddress(data);
    };

    public getUserDeliveryAddresses = async (userId: string): Promise<(typeof Address)[]> => {
        return this.dao.getUserDeliveryAddresses(userId);
    };

    public editAddress = async (addressId: string, data: EditAddressFields): Promise<any> => {
        return this.dao.editAddress(addressId, data);
    };

    public deleteAddress = async (addressId: string): Promise<any> => {
        return this.dao.deleteAddress(addressId);
    };
}
