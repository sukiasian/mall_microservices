import { OptionGroupType, ResponseStatus } from './enums';

export interface ServerResponseBody<T> {
    status: ResponseStatus.SUCCESS;
    message?: string;
    data?: T;
}

export interface LoginBody {
    login: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

interface OptionEntity {
    id: number;
    title: string;
    price: number;
}

interface OptionGroupEntity {
    id: number;
    type: OptionGroupType;
    title: string;
    maxAllowedOptions: number;
    priceForGroup: string;
    isRequired: boolean;
    description: string;
    options: OptionEntity[];
}

interface ProductEntity {
    id: number;
    title: string;
    description: string;
    soldByWeight: boolean;
    maxWeight: string;
    minWeight: string;
    weightIncrement: string;
    measure: string;
    unitsOfMeasure: string;
    price: string;
    priceInDeliveryWithSelf: string;
    oldPrice: string;
    optionGroups: OptionGroupEntity[];
}

interface CategoryEntity {
    title: string;
    emoji: string;
    products: ProductEntity[];
}

interface LegalInfoEntity {
    inn: string;
    name: string;
    phone: string;
}

export interface OutletEntity {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    workHoursStart: string;
    workHoursEnd: string;
    minReadyTime: number;
    categories: CategoryEntity[];
    legalInfo: LegalInfoEntity;
}

export interface OrderEntity {
    id: number;
    price: string;
    comment: string;
    options: OrderProductOptionBody;
}

export interface CreateOrderBody {
    externalId: string;
    orderProducts: OrderEntity[];
    totalPrice: string;
    comment: string;
    cutlery: number;
}

export interface CreateOrderResponse {
    orderId: number;
}

export interface OrderProductOptionBody {
    id: number;
    quantity: number;
}

export interface AddressSchema {
    userId: string;
    street: string;
    building: string;
    apt?: number;
    floor?: number;
    entrance?: number;
    additional_comments?: string;
}

export interface EditAddressFields {
    street?: string;
    building?: string;
    apt?: number;
    floor?: number;
    entrance?: number;
    additional_comments?: string;
}
