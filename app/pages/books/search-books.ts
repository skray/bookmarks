import {Component} from '@angular/core'
import {Response} from '@angular/http'
import {NavController} from 'ionic-angular';

import {GoogleBooks} from '../../services/googlebooks'
import {GoogleBookSearchResult} from '../../models/GoogleBookSearchResult'
import {EditBookPage} from './edit-book'
import {Book} from '../../models/Book'

@Component({
  templateUrl: './build/pages/books/search-books.html',
  providers: [GoogleBooks]
})
export class SearchBooksPage {

  public results:Array<GoogleBookSearchResult>
  public searching:boolean = false
  public errored:boolean = false
  public searchStr:string

  constructor(
    public googlebooks:GoogleBooks,
    public navCtrl:NavController
  ) {
    this.results = new Array<GoogleBookSearchResult>()
  }

  public searchBooks(evt:any) {
    this.errored = false
    if(!this.searchStrEmpty()) {
      this.searching = true
      this.googlebooks.searchBooks(this.searchStr).subscribe(
        (res:Array<GoogleBookSearchResult>) => {
          this.searching = false
          this.results = res
        },
        (error:Response) =>  {
          this.searching = false
          this.errored = true
          console.log(error.status)
          console.log(error.text())
        }
      )
    } else {
      this.results = new Array<GoogleBookSearchResult>()
    }
  }

  public searchStrEmpty() {
    return typeof this.searchStr !== 'string' || this.searchStr.length <= 0
  }

  public choose(book:GoogleBookSearchResult) {
    this.navCtrl.push(EditBookPage, {book: new Book(book)})
  }

}
