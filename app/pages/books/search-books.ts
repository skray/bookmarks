import {Component} from '@angular/core'
import {GoodReads} from '../../services/goodreads'

@Component({
  templateUrl: './build/pages/books/search-books.html',
  providers: [GoodReads]
})
export class SearchBooksPage {

  constructor(
    public goodreads:GoodReads
  ) {
    this.goodreads.searchBooks('Ancillary')
  }

}
