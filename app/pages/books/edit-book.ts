import {Component} from '@angular/core';
import {Platform, NavParams, ViewController} from 'ionic-angular';
import {Book} from './Book';
import * as storager from '../../storager/storager';

@Component({
  templateUrl: './build/pages/books/edit-book.html'
})
export class EditBookModal {
  public book:Book;

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) {
    if(params.get('book')) {
      this.book = params.get('book');
    } else {
      this.book = new Book();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    storager.saveBook(this.book);
    this.dismiss();
  }
}
