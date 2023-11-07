export class Message {
    id?: number;
    sender?: number;
    recipient?: number;
    content?: string;
    timestamp?: Date;
    isSent?: boolean;

    constructor(id?: number, sender?: number, recipient?: number, content?: string, timestamp?: Date, isSent?: boolean) {
        this.id = id;
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
        this.timestamp = timestamp;
        this.isSent = isSent;
    }
}
