// entities/enquiries.ts

export class Superleads {
    name: String;
    email: String
    phone: Number;
    hubLocation : String
    uniqueId : String;
  
    constructor(data: SuperleadsData) {
      this.name = data.name;
      this.email = data.email;
      this.hubLocation = data.hubLocation;
      this.phone = data.phone;
      this.uniqueId = data.uniqueId;
  
  
    }
  }
  
  interface SuperleadsData {
    name: String;
    email: String;
    hubLocation : String
    phone: Number;
    uniqueId: String;
  }
  