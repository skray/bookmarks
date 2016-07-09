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
    this.loadBooks();
  }

  createNew() {
    let modal = Modal.create(NewBookModal, {});
    modal.onDismiss(data => {
      this.loadBooks();
    });
    this.nav.present(modal);
  }

  private loadBooks() {
    storager.list().then((books)=> {
      this.books = books;
    });
  }
}
