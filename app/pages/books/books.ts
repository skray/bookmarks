import {Component} from '@angular/core'
import {Modal, NavController} from 'ionic-angular'
import {EditBookModal} from './edit-book'
import {Book} from './Book';
import * as storager from '../../storager/storager';
import {Rating} from '../../rating/rating';

@Component({
  templateUrl: './build/pages/books/books.html',
  directives: [Rating]
})
export class BooksPage {

  public books:Array<Book> = [];
  public filteredBooks: Array<Book>;
  public readFilterValue:string = 'unread';

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

  readFilterChanged(event) {
    this.filter(event.value);
  }

  private loadBooks() {
    storager.list().then((books)=> {
      books.sort((a,b) => {
        return a.created < b.created ? 1 : -1;
      });
      this.books = books;
      this.filteredBooks = books;
      this.filter(this.readFilterValue);
    });
  }

  private filter(readValue:string) {
    switch(readValue) {
      case 'read':
        this.filteredBooks = this.books.filter((book:Book) => {
          return book.read;
        });
        break;
      case 'unread':
        this.filteredBooks = this.books.filter((book:Book) => {
          return !book.read;
        });
        break;
      default:
        this.filteredBooks = Array.from(this.books);
    }
  }
}
