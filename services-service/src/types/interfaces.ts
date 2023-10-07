import { ResponseStatus } from './enums';

export interface _1CServerResponse<T> {
    result: boolean;
    Parameters: T;
}

export interface ServerResponseBody<T> {
    status: ResponseStatus.SUCCESS;
    message?: string;
    data?: T;
}

export interface GetServiceProvidersQueryParams {
    club_id: string;
    start_date?: string;
    end_date?: string;
    service_id?: string;
}

export interface GetServiceProvidersResponseBody {
    id: string;
    name: string;
    position: {
        id: string;
        title: string;
    };
    photo: string;
    favourite: boolean;
}

export interface GetServicesQueryParams extends qs.ParsedQs {
    club_id: string;
    start_date?: string;
    end_date?: string;
    employee_id?: string;
}

export interface GetAvailableServicesResponseBody {
    id: string;
    title: string;
    parent: {
        id: string;
        title: string;
    };
    price: number;
    description: string;
    strength: string;
    endurance: string;
    cardio: string;
    flexibility: string;
    payment_required: boolean;
    sort_order: number;
}

export interface GetAvailableDatesForServiceQueryParams extends qs.ParsedQs {
    club_id: string;
    start_date?: string;
    end_date?: string;
    employee_id?: string;
    service_id?: string;
}

export interface GetAvailableTimeSlotsQueryParams extends qs.ParsedQs {
    club_id: string;
    start_date?: string;
    end_date?: string;
    employee_id?: string;
    service_id?: string;
}

export interface GetAvailableTimeSlotsResponseBody {
    time: string;
    seance_length: string;
    date_time: string;
    appointment_id: string;
    service_title: string;
}

export interface GetAppointmentResponseBody {
    appointment_id: string;
    already_booked: string;
    payment_required: string;
    canceled: string;
    reason_for_cancellation: string;
    status: 'temporarily_reserved_need_payment' | 'reserved' | 'reserved_and_payed';
    service: {
        title: string;
        id: string;
        description: string;
        color: string;

        course: {
            title: string;
            id: string;
            price: number;
        };
    };
    service_replacement: {
        title: string;
        id: string;
        description: string;
    };
    group: {
        title: string;
        id: string;
    };
    room: {
        title: string;
        id: string;
    };

    room_replacement: {
        title: string;
        id: string;
    };
    employee: {
        name: string;
        id: string;

        biography: string;
        awards: string;
        photo: string;
        position: {
            title: string;
            id: string;
        };
        description: Object;
    };
    employee_replacement: {
        name: string;
        id: string;
        position: {
            title: string;
            id: string;
        };
    };
    type: 'classes' | 'personal';
    start_date: string;
    start_date_replacement: string;
    end_date: string;
    duration: number;
    commercial: boolean;
    booking_online: boolean;
    booking_window: {
        start_date_time: string;
        end_date_time: string;
    };
    cost: number;
    marketing_badges: ['first_free', 'new', 'popular'];
}

export interface AppointmentRequestBody {
    club_id: string;
    appointment_id?: string;
    date_time?: string;
    ticket_id?: string;
    service_id?: string;
    employee_id?: string;
    room_id?: string;
    duration?: number;
}

interface _1CServiceEntity {
    appointment: {
        id: string;
        service: {
            id: string;
            title: string;
        };
        title: string;
        employee_name: string;
        date_time: string;
    };
    customer: {
        id: string;
        client_name: string;
        phone: string[];
        email: string[];
    };
}

export interface CancelAppointmentQueryParams {
    appointment_id?: string;
}

export interface AppointForServiceResponseBody extends _1CServiceEntity {
    status: string;
    temporarily_reserved: boolean;
}

export interface CancelAppointmentResponseBody extends _1CServiceEntity {}

export interface GetPricesByEmployeesQueryParams extends qs.ParsedQs {
    item_id: string;
    club_id: string;
}

export interface GetPricesByEmployeesResponseBody {
    employee: {
        id: string;
    };
    name: string;
    description: string;
    photo: string;
    position: string;
    id: string;
    title: string;
    biography: string;
    awards: string;
    price_type: {
        id: string;
        title: string;
    };
    price: number;
}
