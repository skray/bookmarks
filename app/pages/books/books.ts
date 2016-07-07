import {Component} from '@angular/core'
import {Modal, NavController} from 'ionic-angular'
import {NewBookModal} from './new-book'
import {Book} from './Book';
import * as storager from '../../storager/storager';

@Component({
  templateUrl: 'build/pages/books/books.html'
})
export class BooksPage {

  public books:any = [];

  constructor(public nav: NavController) {
    var that = this;
    storager.list().then((books)=> {
      console.log(books);
      this.books = books;
    });
  }

  createNew() {
    let modal = Modal.create(NewBookModal, {});
    this.nav.present(modal);
  }
}
