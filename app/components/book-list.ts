import {Component, Input, Output, EventEmitter} from '@angular/core'
import {ModalController} from 'ionic-angular'
import {Book} from '../models/Book'
import {EditBookModal} from '../pages/books/edit-book'
import {Rating} from '../components/rating'

@Component({
  selector: 'book-list',
  templateUrl: './build/components/book-list.html',
  directives: [Rating]
})
export class BookList {
  @Input() books: Array<Book>
  @Output() onDismiss = new EventEmitter<any>();

  constructor(public modalCtrl:ModalController) { }

  showEdit(book: Book) {
    let modal = this.modalCtrl.create(EditBookModal, {book: book})
    modal.onDidDismiss(data => {
      this.onDismiss.emit('dismissed')
    })
    modal.present()
  }
}
