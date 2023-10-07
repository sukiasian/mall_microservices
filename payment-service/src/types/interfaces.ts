import { ResponseStatus } from './enums';

export interface _1CServerResponse<T> {
    result: boolean;
    data: T;
}

export interface ServerResponseBody<T> {
    status: ResponseStatus.SUCCESS;
    message?: string;
    data?: T;
}

export interface CartEntity {
    purchase_id: string;
    count: number;
    price_type_id?: string;
    employee_id?: string;
    course_id?: string;
    cycle_period_id?: string;
    start_date?: string;
}

export interface PaymentListEntity {
    type: string;
    amount: number;
    id?: string;
}

export interface PaymentInfoEntity {
    approval_code: string;
    auth_ref_num: string;
    card_num: string;
}

export interface PromotionEntity {
    type: string;
    title: string;
    count: number;
    amount: number;
}

export interface MayBePaymentEntity {
    id: string;
    titile: string;
    type: string; // deposit - лицевой счет, bonus - бонусный
    promotions: PromotionEntity;
    certificate: string;
    use_sberbank_fiscalization: boolean;
    org_id: string;
    cart_pay: [{ id: string; val: number }];
}

export interface ClubEntity {
    id: string;
    title: string;
}

export interface InstallmentPlanEntity {
    date: string;
    amount: number;
    paid_amount: number;
    debt: number;
}

export interface DebtEntity {
    id: string;
    date: string;
    total_amount: number;
    paid_amount: number;
    org_id: string;
    type_tax: string;
    payable_amount: number;
    description: number;
    installment_plan: InstallmentPlanEntity;
}

export interface PaymentBody {
    transaction_id: string;
    cart: CartEntity;
    payment_list: PaymentListEntity;
    club_id: string;
    lead_id?: string;
    promocode?: string;
    payment_info?: PaymentInfoEntity;
}

export interface PayForDebtsBody {
    transaction_id: string;
    sales: string[];
    payment_list: PaymentListEntity;
    club_id: string;
    payment_info?: PaymentInfoEntity;
}

export interface AddCreditCardBody {
    token: string;
    exp_month: string;
    exp_year: number;
    holder: string;
    brand: string;
    first_1: string;
    last_4: string;
}

export interface PaymentResponse extends _1CServerResponse<null> {}

export interface PayForDebtsResponse extends _1CServerResponse<null> {}

export interface CreditCardEntity {
    id: string;
    token: string;
    exp_year: number;
    exp_month: number;
    holder: string;
    brand: string;
    first_1: number;
    last_4: number;
    surname: string;
    name: string;
}

export interface GetUserCartResponse {
    cart: CartEntity;
    total_amount: number;
    total_discount: number;
    total_deposit: number;
    may_be_payment: [];
}

export interface GetUserDebtsResponse {
    club: ClubEntity;
    debts: DebtEntity;
}
