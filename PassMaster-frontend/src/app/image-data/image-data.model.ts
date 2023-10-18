import { User } from "../user/user.model";

export class ImageData {
    id ?: number;
    name ?: string;
    type ?: string;
    imageData ?: Blob;
    user ?: User;

    constructor(id ?: number, name ?: string, type ?: string, imageData ?: Blob, user ?: User) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.imageData = imageData;
        this.user = user;
      }
}
