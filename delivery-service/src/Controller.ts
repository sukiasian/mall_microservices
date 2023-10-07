import { AbstractController } from './types/abstracts';
import ErrorProcessor from './utils/ErrorProcessor';
import Service from './Service';
import ApiService from './ApiService';
import { ServerErrorMessage, ServerResponseMessage } from './types/enums';

export default class Controller extends ErrorProcessor implements AbstractController {
    private service: Service;
    private apiService: ApiService;

    constructor(service: Service, apiService: ApiService) {
        super();

        this.service = service;
        this.apiService = apiService;
    }

    public getRestaurantsByMarketId = this.catchAsync(async (req, res, next) => {
        const { address, table } = req.query;
        const marketId = (req.query.market_id as string) || '1';

        this.apiService.validateIfOnlyAddressOrTableAreSent(table as string, address as string);
        this.apiService.validateTable(table as string);
        this.apiService.validateAddress(address as string);

        const outlets = await this.apiService.getRestaurantsForSpecifiedMarket(marketId, res.locals.token);

        const processedApiData = this.service.processRestaurants(outlets);

        const responseBodyToSend = this.service.createResponseBody(null, processedApiData);

        res.status(200).json(responseBodyToSend);
    });

    public getMenuByRestaurantId = this.catchAsync(async (req, res, next) => {
        const marketId = (req.query.market_id as string) || '1';

        const outlets = await this.apiService.getRestaurantsForSpecifiedMarket(marketId, res.locals.token);
        const restaurantMenu = this.service.retrieveRestaurantMenuCategoriesFromRestaurant(outlets, req.params.id);
        const processedData = this.service.processRestaurantMenu(restaurantMenu);

        const responseBodyToSend = this.service.createResponseBody(null, processedData);

        res.status(200).json(responseBodyToSend);
    });

    public createOrder = this.catchAsync(async (req, res, next) => {});

    public getUserOrders = this.catchAsync(async (req, res, next) => {
        const date = new Date().toISOString();

        const mockedOrders = [
            {
                id: '1',
                stage: 0,
                totalPrice: 1030,
                date,
                orderNumber: '1',
            },

            {
                id: '2',
                stage: 1,
                totalPrice: 3300,
                date,
                orderNumber: '2',
            },

            {
                id: '3',
                stage: 2,
                totalPrice: 1290,
                date,
                orderNumber: '3',
            },
            {
                id: '4',
                stage: 3,
                totalPrice: 1860,
                date,
                orderNumber: '4',
            },

            {
                id: '5',
                stage: 3,
                totalPrice: 1860,
                date,
                orderNumber: '5',
            },

            {
                id: '6',
                stage: 3,
                totalPrice: 3720,
                date,
                orderNumber: '6',
            },
        ];

        res.status(200).json({ orders: mockedOrders });
    });

    public getOrderByOrderId = this.catchAsync(async (req, res, next) => {
        const date = new Date().toISOString();

        const mockedOrders = [
            {
                id: '1',
                stage: 0,
                date,
                bonusesAccrued: 75.23,
                products: [
                    {
                        id: '1',
                        name: 'Суши сет',
                        quantity: 2,
                        price: 515,
                        image: 'https://media.istockphoto.com/id/1053854126/es/foto/todo-lo-que-pueden-comer-sushi.jpg?s=1024x1024&w=is&k=20&c=uvw_1cUUlh05YOwbNjbYC_1XH893Wav3B2GEKkZneFM=',
                    },
                ],
                paymentMethod: '7521',
                deliveryAddress: {
                    street: 'ул. Ленина',
                    building: '4А',
                    apt: 4,
                    entrance: 1,
                    floor: 1,
                },
                isDelivery: true,
            },
            {
                id: '2',
                stage: 1,
                bonusesAccrued: 10,
                products: [
                    {
                        id: '2',
                        name: 'Пицца 4 сыра',
                        quantity: 3,
                        price: 1100,
                        image: 'https://e2.edimdoma.ru/data/recipes/0010/4988/104988-ed4_wide.jpg?1628783796',
                    },
                ],
                paymentMethod: '7521',
                deliveryAddress: null,
                idDelivery: false,
            },
            {
                id: '3',
                stage: 2,
                bonusesAccrued: 35,
                products: [
                    {
                        id: '3',
                        name: 'Вок с морепродуктами',
                        quantity: 3,
                        price: 430,
                        image: 'https://xn--b1aqjenlka.xn--p1ai/img/recepty/3292/big.jpg',
                    },
                ],
                paymentMethod: '7521',
                deliveryAddress: {
                    street: 'ул. Ленина',
                    building: '4А',
                    apt: 4,
                    entrance: 1,
                    floor: 1,
                },
                isDelivery: true,
            },
            {
                id: '4',
                stage: 3,
                bonusesAccrued: 31.23,
                products: [
                    {
                        id: '4',
                        name: 'Том Ям',
                        quantity: 2,
                        price: 930,
                        image: 'https://www.vsegdavkusno.ru/assets/cache_image/recipes/2711/image_1130/tom-jam-nam-khon-low_0x0_6f7.webp',
                    },
                ],
                paymentMethod: '7521',
                deliveryAddress: {
                    street: 'ул. Ленина',
                    building: '4А',
                    apt: 4,
                    entrance: 1,
                    floor: 1,
                },
                isDelivery: true,
            },
            {
                id: '5',
                stage: 3,
                bonusesAccrued: 12,
                products: [
                    {
                        id: '5',
                        name: 'Люля кебаб',
                        quantity: 2,
                        price: 930,
                        image: 'https://mangalplus.ru/images/ab__webp/blog/14/kebab_jpg.webp',
                    },
                ],
                paymentMethod: '7521',
                deliveryAddress: null,
                isDelivery: false,
            },
            {
                id: '6',
                stage: 3,
                bonusesAccrued: 7,
                products: [
                    {
                        id: '6',
                        name: 'Хачапури по-аджарски',
                        quantity: 2,
                        price: 930,
                        image: 'https://kulinarnia.ru/wp-content/uploads/2016/10/hachapuri-po-adzharski-re%D1%81ept-s-foto.jpg',
                    },
                    {
                        id: '5',
                        name: 'Люля кебаб',
                        quantity: 2,
                        price: 930,
                        image: 'https://mangalplus.ru/images/ab__webp/blog/14/kebab_jpg.webp',
                    },
                ],
                paymentMethod: '7521',
                deliveryAddress: 12,
                isDelivery: true,
            },
        ];

        const order = mockedOrders[parseInt(req.params.id, 10) - 1];

        res.status(200).json({ order });
    });

    public addNewAddress = this.catchAsync(async (req, res, next) => {
        const newAddress = await this.service.addNewAddress({ ...req.body, userId: res.locals.userId });

        const responseBodyToSend = this.service.createResponseBody(ServerResponseMessage.ADDRESS_IS_ADDED, newAddress);

        res.status(201).json(responseBodyToSend);
    });

    public getUserDeliveryAddresses = this.catchAsync(async (req, res, next) => {
        const addresses = await this.service.getUserDeliveryAddresses(res.locals.userId);

        const responseBodyToSend = this.service.createResponseBody(null, addresses);

        res.status(200).json(responseBodyToSend);
    });

    public editAddress = this.catchAsync(async (req, res, next) => {
        const newAddress = await this.service.editAddress(req.params.id, req.body);

        const responseBodyToSend = this.service.createResponseBody(ServerErrorMessage.ADDRESS_IS_UPDATED, newAddress);

        res.status(200).json(responseBodyToSend);
    });

    public deleteAddress = this.catchAsync(async (req, res, next) => {
        await this.service.deleteAddress(req.params.id);

        const responseBodyToSend = this.service.createResponseBody(ServerErrorMessage.ADDRESS_IS_DELETED);

        res.status(200).json(responseBodyToSend);
    });
}
