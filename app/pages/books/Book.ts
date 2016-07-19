import { Injectable } from '@angular/core';

@Injectable()
export class Book {

  id:String;
  name:String;
  status:String;
  notes:String;
  rating:Number;
  read:Boolean;
  created:Date;

  constructor() {
    this.created = new Date();
  }
}
