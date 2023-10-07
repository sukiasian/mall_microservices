import { FreezingTicketRequestBody } from './request-bodies/requestBodies';
import { TicketName, TicketType } from './types/enums';

export default class MessageService {
    private static months: string[];

    static {
        this.months = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря',
        ];
    }

    private static checkIfNumberIsPlural = (num: number): boolean => {
        return (num !== 1 && num % 10 !== 1) ?? false;
    };

    private static getTicketName = (type: TicketType | string): string => {
        switch (type) {
            case TicketType.MEMBERSHIP:
                return TicketName.MEMBERSHIP;

            case TicketType.PACKAGE:
                return TicketName.PACKAGE;
        }
    };

    // DD Month Year
    private static parseDateToLanguageFormat = (dateStr: string): string => {
        const date = new Date(dateStr);

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${this.months[month]} ${year}`;
    };

    public static createFreezeMessage = ({ type, count, date }: FreezingTicketRequestBody): string => {
        return `${this.getTicketName(type)} будет заморожен ${this.parseDateToLanguageFormat(date)} года на ${
            this.checkIfNumberIsPlural(count) ? 'суток' : 'сутки'
        }`;
    };

    public static createUnreezeMessage = ({ type, date }: FreezingTicketRequestBody): string => {
        return `${this.getTicketName(type)} будет разморожен ${this.parseDateToLanguageFormat(date)} года`;
    };
}
