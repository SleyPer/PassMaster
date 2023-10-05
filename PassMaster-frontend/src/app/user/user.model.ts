export class User {
    id ?: number;
    name ?: string;
    mail ?: string;
    pass ?: string;
  
    constructor(id ?: number, name ?: string, mail ?: string, pass ?: string) {
      this.id = id;
      this.name = name;
      this.mail = mail;
      this.pass = pass;
    }
  }
  