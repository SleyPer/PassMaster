import { User } from "./user.model";

export class Activation {
    id ?: number;
    creation ?: string;
    expiration ?: string;
    activation ?: string;
    code ?: string;
    user ?: User;
  
    constructor(id ?: number, creation ?: string, expiration ?: string, activation ?: string, code ?: string, user ?: User) {
      this.id = id;
      this.creation = creation;
      this.expiration = expiration;
      this.activation = activation;
      this.code = code;
      this.user = user;
    }
  }
  