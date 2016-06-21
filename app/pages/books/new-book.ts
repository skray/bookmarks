import {Component} from '@angular/core';
import {Platform, NavParams, ViewController, Storage, SqlStorage} from 'ionic-angular';
import {Book} from './Book';

@Component({
  templateUrl: './build/pages/books/new-book.html'
})
export class NewBookModal {
  public book:any = {};

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.book.created = new Date()
    this.book = new Book(this.book);
    this.dismiss();
  }
}
