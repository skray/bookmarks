import {Component} from '@angular/core'
import {Modal, NavController} from 'ionic-angular'
import {EditBookModal} from './edit-book'
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

  showEdit(book: Book) {
    let modal = Modal.create(EditBookModal, {book: book});
    modal.onDismiss(data => {
      this.loadBooks();
    });
    this.nav.present(modal);
  }

  private loadBooks() {
    storager.list().then((books)=> {
      books.sort((a,b) => {
        return a.created < b.created ? 1 : -1;
      });
      this.books = books;
    });
  }
}
