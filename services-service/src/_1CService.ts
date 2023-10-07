import * as axios from 'axios';
import * as sha256 from 'sha256';
import { _1CApiURL } from './types/enums';
import ErrorProcessor from './utils/ErrorProcessor';
import {
    AppointForServiceResponseBody,
    AppointmentRequestBody,
    CancelAppointmentQueryParams,
    CancelAppointmentResponseBody,
    GetAppointmentResponseBody,
    GetAvailableDatesForServiceQueryParams,
    GetAvailableServicesResponseBody,
    GetAvailableTimeSlotsQueryParams,
    GetAvailableTimeSlotsResponseBody,
    GetPricesByEmployeesQueryParams,
    GetPricesByEmployeesResponseBody,
    GetServiceProvidersQueryParams,
    GetServiceProvidersResponseBody,
    GetServicesQueryParams,
    _1CServerResponse,
} from './types/interfaces';
import { GetAvailableDatesResponseBody } from './types/types';

export default class _1CService extends ErrorProcessor {
    private readonly authorizedHttpHeaders: axios.RawAxiosRequestHeaders = {
        'Content-Type': 'application/json',
        apikey: process.env.API_KEY,
    };
	
	constructor() {
        super();

        this.authorizedHttpHeaders.Authorization = `Basic ${this.encode1CLoginCredentialsInBase64()}`;
    }

    private encode1CLoginCredentialsInBase64 = (): string => {
        const { _1C_LOGIN, _1C_PASSWORD } = process.env;

        const buffer = Buffer.from(`${_1C_LOGIN}:${_1C_PASSWORD}`);
        const base64data = buffer.toString('base64');

        return base64data;
    };

    public getPricesByEmployeesForService = async (
        queryParams: GetPricesByEmployeesQueryParams,
        userToken: string
    ): Promise<GetPricesByEmployeesResponseBody> => {
        const response = await axios.default.get(_1CApiURL.GET_PRICES_PER_EMPLOYEES_FOR_SERVICE, {
            headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
            params: queryParams || {},
        });

        return response.data.data;
    };

    public getServiceProvidersWithTheirServices = async (
        queryParams: GetServiceProvidersQueryParams, userToken: string
    ): Promise<GetServiceProvidersResponseBody[]> => {
        const response = await axios.default.get(_1CApiURL.GET_SERVICE_PROVIDERS_WITH_THEIR_SERVICES, {
            headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
            params: queryParams || {},
        });

        return response.data.data;
    };

    public getAvailableServices = async (
        queryParams: GetServicesQueryParams, userToken: string
    ): Promise<GetAvailableServicesResponseBody> => {
        const response = await axios.default.get(_1CApiURL.GET_AVAILABLE_SERVICES, {
            headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
            params: queryParams || {},
        });

        return response.data.data;
    };

    public getAvailableDatesForService = async (
        queryParams: GetAvailableDatesForServiceQueryParams, 
		userToken: string
    ): Promise<GetAvailableDatesResponseBody> => {
        const response = await axios.default.get(_1CApiURL.GET_AVAILABLE_DATES_FOR_SERVICE, {
			headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
            params: queryParams || {},
        });

        return response.data.data;
    };

    public getAvailableTimeSlotsOnSpecifiedDate = async (
        queryParams: GetAvailableTimeSlotsQueryParams, userToken: string
    ): Promise<GetAvailableTimeSlotsResponseBody> => {
        // TODO нужно перекинуть service_id из req.params в req.query
        const response = await axios.default.get(_1CApiURL.GET_AVAILABLE_TIME_SLOTS_FOR_SERVICE, {
			headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
            params: queryParams || {},
        });

        return response.data.data;
    };

    public getAppointment = async (appointmentId: string, userToken: string): Promise<GetAppointmentResponseBody> => {
        const response = await axios.default.get(_1CApiURL.GET_APPOINTMENT, {
            headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
            params: { appointment_id: appointmentId } || {},
        });

        return response.data.data;
    };

    public appointForService = async (
        appointmentData: AppointmentRequestBody | string,
        userToken: string
    ): Promise<AppointForServiceResponseBody> => {
        const response = await axios.default.post(_1CApiURL.APPOINT_FOR_SERVICE, appointmentData, {
            headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
        });

        return response.data.data;
    };

    public cancelAppointment = async (
        queryParams: CancelAppointmentQueryParams,
        userToken: string
    ): Promise<CancelAppointmentResponseBody> => {
        const response = await axios.default.delete(_1CApiURL.CANCEL_APPOINTMENT, {
            headers: { ...this.authorizedHttpHeaders, usertoken: userToken },
            params: queryParams || {},
        });

        return response.data.data;
    };
}
