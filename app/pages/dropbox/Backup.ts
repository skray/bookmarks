import { Injectable } from '@angular/core';
import { Book } from '../books/Book';

@Injectable()
export class Backup {

  date:Date;
  books:Array<Book>

  public constructor(books:Array<Book>) {
    this.books = books;
    this.date = new Date();
  }
}
