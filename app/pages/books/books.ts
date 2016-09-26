import {Component} from '@angular/core'
import {ModalController, NavController} from 'ionic-angular'
import {EditBookPage} from './edit-book'
import {SearchBooksPage} from './search-books'
import {Book} from '../../models/Book'
import * as storager from '../../services/storager'
import {BookList} from '../../components/book-list'

@Component({
  templateUrl: './build/pages/books/books.html',
  directives: [BookList]
})
export class BooksPage {

  public books:Array<Book> = []
  public filteredBooks: Array<Book>
  public readFilterValue:string = 'unread'

  constructor(
    public navCtrl: NavController
  ) {}

  ionViewDidEnter() {
    this.loadBooks()
  }

  readFilterChanged(event) {
    this.filter(event.value)
  }

  public loadBooks() {
    storager.list().then((books)=> {
      books.sort((a,b) => {
        return a.created < b.created ? 1 : -1
      })
      this.books = books
      this.filteredBooks = books
      this.filter(this.readFilterValue)
    })
  }

  addNew() {
    this.navCtrl.push(SearchBooksPage)
  }

  showEdit(book: Book) {
    this.navCtrl.push(EditBookPage, {book: book})
  }

  private filter(readValue:string) {
    switch(readValue) {
      case 'read':
        this.filteredBooks = this.books.filter((book:Book) => {
          return book.read
        })
        break
      case 'unread':
        this.filteredBooks = this.books.filter((book:Book) => {
          return !book.read
        })
        break
      default:
        this.filteredBooks = Array.from(this.books)
    }
  }
}
