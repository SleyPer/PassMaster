export class Chest {
    id ?: number;
    name: string;
    description: string;
    creationDate ?: string;
    username: string;
    password: string;
    link: string;
  
    constructor(id: number, name: string, description: string, creationDate: string, username: string, password: string, link: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.creationDate = creationDate;
      this.username = username;
      this.password = password;
      this.link = link;
    }
  }
  