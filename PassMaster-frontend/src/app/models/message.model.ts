import { Room } from "./room.model";
import { User } from "./user.model";

export class Message {
    id?: number;
    room?: Room;
    sender?: User;
    content?: string;
    timestamp?: Date;

    constructor(id?: number, room?: Room, sender?: User, content?: string, timestamp?: Date) {
        this.id = id;
        this.room = room;
        this.sender = sender;
        this.content = content;
        this.timestamp = timestamp;
    }
}
