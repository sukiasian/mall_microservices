import * as axios from 'axios';
import { NodeEnvironment, ServerErrorMessage, _1CApiUrl } from './types/enums';
import ErrorProcessor from './utils/ErrorProcessor';
import { LoyaltyLevels, _1CServerResponse } from './types/interfaces';
import AppError from './utils/AppError';

export default class _1CService extends ErrorProcessor {
    private readonly AUTHORIZED_HTTP_HEADERS: axios.RawAxiosRequestHeaders = {
        'Content-Type': 'application/json',
        apikey: process.env.API_KEY,
    };

    private readonly LEVELS_TERMS: LoyaltyLevels = {
        zero: { visits: 0, bonuses: 0 },
        first: { visits: 12, bonuses: 4000 },
        second: { visits: 34, bonuses: 10000 },
        third: { visits: 49, bonuses: 10000 },
    };

    private readonly USERS_HOST =
        process.env.NODE_ENV === NodeEnvironment.PRODUCTION ? 'http://user:7001' : 'http://127.0.0.1:7001';

    constructor() {
        super();

        this.AUTHORIZED_HTTP_HEADERS.Authorization = `Basic ${this.encode1CLoginCredentialsInBase64()}`;
    }

    private encode1CLoginCredentialsInBase64 = (): string => {
        const { _1C_LOGIN, _1C_PASSWORD } = process.env;

        const buffer = Buffer.from(`${_1C_LOGIN}:${_1C_PASSWORD}`);
        const base64data = buffer.toString('base64');

        return base64data;
    };

    public getDefaultBonusAccountOfUser = async (userToken: string) => {
        const response = await axios.default.get(_1CApiUrl.BONUS_ACCOUNTS, {
            headers: { ...this.AUTHORIZED_HTTP_HEADERS, usertoken: userToken },
        });

        if (!response.data.result) {
            throw new AppError(500, ServerErrorMessage.SOMETHING_WENT_WRONG);
        }

        return response.data.data[0];
    };

    private getUserVisits = async (authHeader: string) => {
        const response = await axios.default.get(`${this.USERS_HOST}/visits`, {
            headers: { Authorization: authHeader },
            validateStatus: () => true,
        });

        return response.data.data.visits;
    };

    private getLoyaltyLevel = (accountBalance: number, visits: number) => {
        let level = 0;

        if (visits >= this.LEVELS_TERMS.third.visits) {
            level = 3;

            return level;
        }

        if (visits >= this.LEVELS_TERMS.second.visits) {
            level = 2;

            return level;
        }

        if (accountBalance >= this.LEVELS_TERMS.second.bonuses) {
            level = 2;

            return level;
        }

        if (accountBalance >= this.LEVELS_TERMS.first.bonuses) {
            level = 1;

            return level;
        }

        return level;
    };

    private bonusesRequiredForNextLevel = (currentAmount: number, currentLevel: number): number => {
        const levelKeys = Object.keys(this.LEVELS_TERMS);

        let bonusesRequired: number;

        if (currentLevel === 0) {
            bonusesRequired = this.LEVELS_TERMS.first.bonuses;
        } else {
            bonusesRequired = this.LEVELS_TERMS[levelKeys[currentLevel]].bonuses - currentAmount;
        }

        return bonusesRequired;
    };

    private visitsRequiredForNextLevel = (currentAmount: number, currentLevel: number): number => {
        const levelKeys = Object.keys(this.LEVELS_TERMS);

        let visitsRequired: number;

        if (currentLevel === 0) {
            visitsRequired = this.LEVELS_TERMS.first.visits;
        } else {
            visitsRequired = this.LEVELS_TERMS[levelKeys[currentLevel]].visits - currentAmount;
        }

        return visitsRequired;
    };

    public getUserBonusesInformation = async (userToken: string, authHeader: string) => {
        const currentBalance = (await this.getDefaultBonusAccountOfUser(userToken)).balance;
        const currentVisits = await this.getUserVisits(authHeader);
        const currentLevel = this.getLoyaltyLevel(currentBalance, currentVisits);

        const visitsRequired = this.visitsRequiredForNextLevel(currentVisits, currentLevel);
        const bonusesRequired = this.bonusesRequiredForNextLevel(currentBalance, currentLevel);

        return {
            bonuses: currentBalance,
            bonusLevel: currentLevel,
            visitsRequired,
            bonusesRequired,
        };
    };
}
