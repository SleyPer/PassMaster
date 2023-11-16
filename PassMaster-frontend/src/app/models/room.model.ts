import { User } from "./user.model";

export class Room {
    id?: string;
    name?: string;
    users?: User[];
    sessionIds?: string[];

    constructor(id?: string, name?: string, users?: User[], sessionIds?: string[]) {
        this.id = id;
        this.name = name;
        this.users = users;
        this.sessionIds = sessionIds;
    }
}