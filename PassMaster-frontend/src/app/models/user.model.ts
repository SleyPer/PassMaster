export class User {
    id ?: number;
    firstName ?: string;
    lastName ?: string;
    mail ?: string;
    pass ?: string;
    color ?: string; 
    friends ?: User[];
    profilePicture ?: File;
    sessionId?: string;
  
    constructor(id ?: number, firstName ?: string, lastName ?: string, mail ?: string, pass ?: string, color ?: string, friends ?: User[], profilePicture ?: File, sessionid?: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.mail = mail;
      this.pass = pass;
      this.color = color;
      this.friends = friends;
      this.profilePicture = profilePicture;
      this.sessionId = sessionid;
    }
  }
  