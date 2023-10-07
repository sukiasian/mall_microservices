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

interface TypeOfBonusAccountEntity {
    id: string;
    name: string;
}

export interface BonusAccountEntity {
    id: string;
    name: string;
    balance: number;
    type: TypeOfBonusAccountEntity;
    validity_period: string | null;
    accrual_validity_period: string | null;
}

export interface GetBonusAccountsOfUserResponse {
    date: string;
    operation: 'debit' | 'credit';
    description: string;
    amount: number;
}

export interface LoyaltyLevels {
    [key: string]: LevelTerms;
}

export interface LevelTerms {
    bonuses: number;
    visits: number;
}
