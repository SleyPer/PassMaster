export class User {
    id ?: number;
    firstName ?: string;
    lastName ?: string;
    mail ?: string;
    pass ?: string;
  
    constructor(id ?: number, firstName ?: string, lastName ?: string, mail ?: string, pass ?: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.mail = mail;
      this.pass = pass;
    }
  }
  