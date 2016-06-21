import {Component} from '@angular/core'
import {Modal, NavController} from 'ionic-angular'
import {NewBookModal} from './new-book'
import {Book} from './Book';

@Component({
  templateUrl: 'build/pages/books/books.html'
})
export class BooksPage {

  public books:any = [];

  constructor(public nav: NavController) {
    var that = this;
    Book.list().then((result)=> {
      console.log(result);
      this.books = result.res.rows;
    });
  }

  createNew() {
    let modal = Modal.create(NewBookModal, {});
    this.nav.present(modal);
  }
}
