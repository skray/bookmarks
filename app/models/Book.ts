import { Injectable } from '@angular/core';

@Injectable()
export class Book {

  id:string;
  title:string;
  author:string;
  description:string;
  publishedYear:string;
  thumbnailUrl:string;
  status:string;
  notes:string;
  rating:number;
  read:boolean;
  created:Date;

  constructor() {
    this.created = new Date();
  }
}
