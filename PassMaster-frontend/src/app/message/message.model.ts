export class Message {
    id?: number;
    sender?: number;
    recipient?: number;
    content?: string;
    timestamp?: Date;

    constructor(id?: number, sender?: number, recipient?: number, content?: string, timestamp?: Date) {
        this.id = id;
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
        this.timestamp = timestamp;
    }
}
