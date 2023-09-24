export class Chest {
    chest_id ?: number;
    chest_name ?: string;
    chest_description ?: string;
    chest_creationDate ?: string;
    chest_username ?: string;
    chest_password ?: string;
    chest_link ?: string;
  
    constructor(chest_id ?: number, chest_name ?: string, chest_description ?: string, chest_creationDate ?: string, chest_username ?: string, chest_password ?: string, chest_link ?: string) {
      this.chest_id = chest_id;
      this.chest_name = chest_name;
      this.chest_description = chest_description;
      this.chest_creationDate = chest_creationDate;
      this.chest_username = chest_username;
      this.chest_password = chest_password;
      this.chest_link = chest_link;
    }
  }
  