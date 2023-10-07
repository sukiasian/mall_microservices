export class FreezingTicketRequestBody {
    public readonly ticketId: string;
    public readonly type: string;
    public readonly usertoken: string;
    public readonly date: string;
    public readonly count?: number;

    constructor(id: string, type: string, usertoken: string, date: string, count = null) {
        this.ticketId = id;
        this.type = type;
        this.usertoken = usertoken;
        this.date = date;
        this.count = count;
    }
}
