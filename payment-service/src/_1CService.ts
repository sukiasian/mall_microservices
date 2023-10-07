import * as axios from "axios";
import { _1CApiURL } from "./types/enums";
import ErrorProcessor from "./utils/ErrorProcessor";
import {
    GetUserCartResponse,
    PayForDebtsResponse,
    PayForDebtsBody,
    PaymentBody,
    _1CServerResponse,
    CreditCardEntity,
    AddCreditCardBody,
} from "./types/interfaces";

export default class _1CService extends ErrorProcessor {
    private readonly authorizedHttpHeaders: axios.RawAxiosRequestHeaders = {
        "Content-Type": "application/json",
        apikey: process.env.API_KEY,
    };

    constructor() {
        super();

        this.authorizedHttpHeaders.Authorization = `Basic ${this.encode1CLoginCredentialsInBase64()}`;
    }

    private encode1CLoginCredentialsInBase64 = (): string => {
        const { _1C_LOGIN, _1C_PASSWORD } = process.env;

        const buffer = Buffer.from(`${_1C_LOGIN}:${_1C_PASSWORD}`);
        const base64data = buffer.toString("base64");

        return base64data;
    };

    public getClientCart = async (
        userToken: string
    ): Promise<GetUserCartResponse> => {
        const response = await axios.default.get(_1CApiURL.CART_COST, {
            headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
        });

        return response.data.data;
    };

    public getClientDebts = async (userToken: string): Promise<number> => {
        const response = await axios.default.get(_1CApiURL.DEBTS, {
            headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
        });
        const debtData = response.data.data.filter(
            (debt) => debt.club.id === process.env.CLUB_ID
        )
        if (debtData.length === 0) {
            return 0
        }

        let debtValue = 0;
        const debts = debtData[0]
        if (debts.length > 0) {
            debts.map((debt) => {
                debtValue += debt.payable_amount;
            });
        }

        return debtValue;
    };

    public getClientCreditCards = async (
        userToken: string
    ): Promise<CreditCardEntity> => {
        const response = await axios.default.get(_1CApiURL.CREDIT_CARDS, {
            headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
        });

        return response.data.data;
    };

    public pay = async (
        data: PaymentBody,
        userToken: string
    ): Promise<PaymentResponse> => {
        const response = await axios.default.post(_1CApiURL.PAYMENT, data, {
            headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
        });

        return response.data.data;
    };

    public payForDebt = async (
        data: PayForDebtsBody,
        userToken: string
    ): Promise<PayForDebtsResponse> => {
        const response = await axios.default.post(
            _1CApiURL.DEBTS_PAYMENT,
            data,
            {
                headers: {
                    ...this.authorizedHttpHeaders,
                    usertoken: userToken,
                },
            }
        );

        return response.data.data;
    };

    public addCreditCard = async (
        data: AddCreditCardBody,
        userToken: string
    ): Promise<CreditCardEntity> => {
        const response = await axios.default.post(
            _1CApiURL.CREDIT_CARDS,
            data,
            {
                headers: {
                    ...this.authorizedHttpHeaders,
                    usertoken: userToken,
                },
            }
        );

        return response.data.data;
    };
}
