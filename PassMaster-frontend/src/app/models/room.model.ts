import { User } from "./user.model";

export class Room {
    id?: string;
    name?: string;
    users?: User[];

    constructor(id?: string, name?: string, users?: User[]) {
        this.id = id;
        this.name = name;
        this.users = users;
    }
}