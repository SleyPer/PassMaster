import { User } from "./user.model";

export class Message {
    sender?: User;
    senderId?: number;
    content?: string;
    timestamp?: Date;

    constructor(sender?: User, senderId?: number, content?: string, timestamp?: Date) {
        this.sender = sender;
        this.senderId = senderId;
        this.content = content;
        this.timestamp = timestamp;
      }
  }
  