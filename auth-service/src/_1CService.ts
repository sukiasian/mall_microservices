import * as axios from 'axios';
import * as sha256 from 'sha256';
import { ServerErrorMessage, _1CApiURL } from './types/enums';
import ErrorProcessor from './utils/ErrorProcessor';
import AppError from './utils/AppError';

export default class _1CService extends ErrorProcessor {
    private readonly AUTHORIZED_HTTP_HEADERS: axios.RawAxiosRequestHeaders = {
        'Content-Type': 'application/json',
        apikey: process.env.API_KEY,
    };

    constructor() {
        super();

        this.AUTHORIZED_HTTP_HEADERS.Authorization = `Basic ${this.encode1CLoginCredentialsInBase64()}`;
    }

    private createSHA256Sign = (phone: string): string => {
        const { API_INTEGRATION_KEY } = process.env;

        return sha256(`phone:${phone};key:${API_INTEGRATION_KEY}`);
    };

    private encode1CLoginCredentialsInBase64 = (): string => {
        const { _1C_LOGIN, _1C_PASSWORD } = process.env;

        const buffer = Buffer.from(`${_1C_LOGIN}:${_1C_PASSWORD}`);
        const base64data = buffer.toString('base64');

        return base64data;
    };

    public getPhoneConfirmationCode = async (phone: string): Promise<boolean> => {
        const response = await axios.default.post(
            _1CApiURL.CONFIRM_PHONE,
            { phone },
            { headers: this.AUTHORIZED_HTTP_HEADERS, validateStatus: () => true }
        );

        if (!response.data.result) {
            throw new AppError(400, ServerErrorMessage.INVALID_CODE_REQUEST);
        }

        return response.data.data;
    };

    public confirmPhone = async (phone: string, code: string) => {
        const response = await axios.default.post(
            _1CApiURL.CONFIRM_PHONE,
            { phone, confirmation_code: code },
            { headers: this.AUTHORIZED_HTTP_HEADERS, validateStatus: () => true }
        );

        if (!response.data.result) {
            throw new AppError(500, response.data.error_message || ServerErrorMessage.SOMETHING_WENT_WRONG);
        }

        return response.data;
    };

    public signupUser = async (phone: string, password: string, passToken: string) => {
        const response = await axios.default.post(
            _1CApiURL.SIGNUP_AND_AUTH,
            { phone, password, pass_token: passToken },
            { headers: this.AUTHORIZED_HTTP_HEADERS }
        );

        if (!response.data.result) {
            throw new AppError(500, response.data.error_message || ServerErrorMessage.SOMETHING_WENT_WRONG);
        }

        return response.data.data;
    };

    public getUserDepositAccountId = async (userToken: string) => {
        // directly to 1c
        const response = await axios.default.get(_1CApiURL.GET_USER_DEPOSIT_ACCOUNTS, {
            headers: { ...this.AUTHORIZED_HTTP_HEADERS, usertoken: userToken },
        });

        if (!response.data.result) {
            throw new AppError(500, response.data.error_message || ServerErrorMessage.SOMETHING_WENT_WRONG);
        }

        // FIXME
        return response.data.data[0].id;
    };

    private createRandomTransactionId = (userPhone: string): number => {
        const phoneNumericValue = parseInt(userPhone, 10);

        return Number(
            Math.round(Date.now() - phoneNumericValue)
                .toString()
                .slice(6)
        );
    };

    private createPaymentToGetBonusAccount = async (
        depositId: string,
        userPhone: string,
        userToken: string
    ): Promise<void> => {
        const paymentData = {
            club_id: process.env.CLUB_ID,
            transaction_id: this.createRandomTransactionId(userPhone),
            cart: [
                {
                    purchase_id: '68a1da68-20cb-11ee-bcb0-005056a9cadc',
                    count: 1,
                },
            ],
            payment_list: [
                {
                    type: 'deposit',
                    id: depositId,
                    amount: 0,
                },
            ],
        };

        const acquireBonusAccountResponse = await axios.default.post(_1CApiURL.ACQUIRE_BONUS_ACCOUNT, paymentData, {
            headers: { ...this.AUTHORIZED_HTTP_HEADERS, usertoken: userToken },
        });

        if (!acquireBonusAccountResponse.data.result) {
            throw new AppError(500, ServerErrorMessage.SOMETHING_WENT_WRONG);
        }
    };

    private getUserBonusAccount = async (userToken: string) => {
        const bonusesAccountsResponse = await axios.default.get(_1CApiURL.GET_BONUSES, {
            headers: { ...this.AUTHORIZED_HTTP_HEADERS, usertoken: userToken },
        });

        if (!bonusesAccountsResponse.data.result) {
            throw new AppError(500, ServerErrorMessage.SOMETHING_WENT_WRONG);
        }

        return bonusesAccountsResponse.data.data[0];
    };

    public acquireAndGetBonusAccount = async (depositId: string, userPhone: string, userToken: string) => {
        await this.createPaymentToGetBonusAccount(depositId, userPhone, userToken);
        const bonusAccount = await this.getUserBonusAccount(userToken);

        return bonusAccount.id;
    };

    public getPassToken = async (phone: string): Promise<string> => {
        const sign = this.createSHA256Sign(phone as string);

        const response = await axios.default.get(
            `${_1CApiURL.PASS_TOKEN}?phone=${phone}&sign=${sign}`,

            {
                headers: this.AUTHORIZED_HTTP_HEADERS,
            }
        );

        if (!response.data.result) {
            throw new AppError(500, ServerErrorMessage.SOMETHING_WENT_WRONG);
        }

        return response.data.data.pass_token;
    };

    public getAgreementForm = async () => {
        const response = await axios.default.get(_1CApiURL.AGREEMENT_FORM);

        return response.data;
    };

    public getPublicOfferForm = async () => {
        const response = await axios.default.get(_1CApiURL.PUBLIC_OFFER, {
            headers: this.AUTHORIZED_HTTP_HEADERS,
        });

        return response.data;
    };
}
