import {Component} from '@angular/core'
import {Modal, NavController} from 'ionic-angular'
import {NewBookModal} from './new-book'

@Component({
  templateUrl: 'build/pages/books/books.html'
})
export class BooksPage {

  public books:any = [];

  constructor(public nav: NavController) { }

  createNew() {
    let modal = Modal.create(NewBookModal, {});
    this.nav.present(modal);
  }
}
