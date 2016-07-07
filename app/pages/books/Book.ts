export class Book {

  id:String;
  name:String;
  rating:Number;
  read:Boolean;
  created:Date;

  constructor(properties) {
    this.name = properties.name;
    this.rating = properties.rating;
    this.read = properties.read;
    this.created = new Date();
  }
}
