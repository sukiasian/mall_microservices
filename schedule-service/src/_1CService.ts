import * as axios from "axios";
import ErrorProcessor from "./utils/ErrorProcessor";
import { _1CServerResponse } from "./types/interfaces";
import { ServerErrorMessage, _1CApiURL } from "./types/enums";
import AppError from "./utils/AppError";

export default class _1CService extends ErrorProcessor {
    private readonly AUTHORIZED_HTTP_HEADERS: axios.RawAxiosRequestHeaders = {
        "Content-Type": "application/json",
        apikey: process.env.API_KEY,
    };

    constructor() {
        super();

        this.AUTHORIZED_HTTP_HEADERS.Authorization = `Basic ${this.encode1CLoginCredentialsInBase64()}`;
    }

    private encode1CLoginCredentialsInBase64 = (): string => {
        const { _1C_LOGIN, _1C_PASSWORD } = process.env;

        const buffer = Buffer.from(`${_1C_LOGIN}:${_1C_PASSWORD}`);
        const base64data = buffer.toString("base64");

        return base64data;
    };

    private createQueryDatesIn1C_format = () => {
        const date = new Date();

        const startDate = new Date(date);
        const endDate = new Date(date);

        const startDay = startDate.getDate();
        const startMonth = startDate.getMonth() + 1;
        const startYear = startDate.getFullYear();

        endDate.setDate(startDate.getDate() + 30);

        const endDay = endDate.getDate();
        const endMonth = endDate.getMonth() + 1;
        const endYear = endDate.getFullYear();

        const addZeroBeforeDecimalNumber = (num) => {
            return num > 9 ? num : `0${num}`;
        };

        return {
            startDate: `${startYear}-${addZeroBeforeDecimalNumber(startMonth)}-${addZeroBeforeDecimalNumber(
                startDay
            )} 00:00`,

            endDate: `${endYear}-${addZeroBeforeDecimalNumber(endMonth)}-${addZeroBeforeDecimalNumber(endDay)} 23:59`,
        };
    };

    private createScheduleSeparatedByDates = (appointments) => {
        const dates = [];

        let indexOfLastAdded = -1;

        appointments.forEach((appointment) => {
            const appointmentDate = new Date(appointment.startDate).toDateString();

            if (indexOfLastAdded < 0) {
                dates.push({ date: appointmentDate, appointments: [] });

                indexOfLastAdded++;
            } else if (appointmentDate !== dates[indexOfLastAdded]?.date) {
                dates.push({ date: appointmentDate, appointments: [] });

                indexOfLastAdded++;
            }
        });

        return dates;
    };

    private parseSchedule = async (schedule) => {
        const appointmentsCompressed = schedule.map((appointment) => {
            if (!appointment.canceled) {
                return {
                    id: appointment.appointment_id,
                    isBooked: appointment.already_booked || false,
                    startDate: new Date(appointment.start_date).toISOString(),
                    endDate: new Date(appointment.end_date).toISOString(),
                    title: appointment.service.title,
                    employeeName: appointment.employee.name,
                };
            }
        });

        const parsedSchedule = [...this.createScheduleSeparatedByDates(appointmentsCompressed)];

        let indexOfLastDateUsedByLoop = 0;

        appointmentsCompressed.forEach((appointment) => {
            const currentAppointmentDate = new Date(appointment.startDate).toDateString();
            const lastDateUsedByLoop = parsedSchedule[indexOfLastDateUsedByLoop];

            if (lastDateUsedByLoop.date === currentAppointmentDate) {
                lastDateUsedByLoop.appointments.push(appointment);
            } else {
                lastDateUsedByLoop.date = new Date(lastDateUsedByLoop.date).toISOString();
                indexOfLastDateUsedByLoop++;
            }
        });

        return parsedSchedule;
    };

    public getSchedule = async (userToken: string) => {
        const { startDate, endDate } = this.createQueryDatesIn1C_format();

        const _1Cresponse = await axios.default.get(_1CApiURL.GET_CLASSES, {
            headers: { ...this.AUTHORIZED_HTTP_HEADERS, usertoken: userToken },
            params: {
                start_date: startDate,
                end_date: endDate,
                club_id: process.env.CLUB_ID,
            },
            validateStatus: () => true,
        });

        if (!_1Cresponse.data.result) {
            throw new AppError(500, ServerErrorMessage.SOMETHING_WENT_WRONG);
        }

        const parsedSchedule = this.parseSchedule(_1Cresponse.data.data);

        return parsedSchedule;
    };
}
