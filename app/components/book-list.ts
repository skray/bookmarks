import {Component, Input, Output, EventEmitter} from '@angular/core'
import {NavController} from 'ionic-angular'
import {Book} from '../models/Book'
import {EditBookPage} from '../pages/books/edit-book'
import {Rating} from '../components/rating'

@Component({
  selector: 'book-list',
  templateUrl: './build/components/book-list.html',
  directives: [Rating]
})
export class BookList {
  @Input() books: Array<Book>
  @Output() onDismiss = new EventEmitter<any>();

  constructor(public navCtrl:NavController) { }

  showEdit(book: Book) {
    this.navCtrl.push(EditBookPage, {book: book})
  }
}
