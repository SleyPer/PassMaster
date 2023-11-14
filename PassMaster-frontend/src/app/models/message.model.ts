import { User } from "./user.model";

export class Message {
    id?: number;
    senderId?: number;
    sender?: User;
    content?: string;
    timestamp?: Date;

    constructor(id?: number, senderId?: number, sender?: User, content?: string, timestamp?: Date) {
        this.id = id;
        this.senderId = senderId;
        this.sender = sender;
        this.content = content;
        this.timestamp = timestamp;
    }
}
