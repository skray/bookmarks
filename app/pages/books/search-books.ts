import {Component} from '@angular/core'
import {GoogleBooks} from '../../services/googlebooks'
import {Response} from '@angular/http'


@Component({
  templateUrl: './build/pages/books/search-books.html',
  providers: [GoogleBooks]
})
export class SearchBooksPage {

  public results:Array<any>

  constructor(
    public googlebooks:GoogleBooks
  ) {
    this.googlebooks.searchBooks('Ancillary').subscribe(
      (res) => {
        console.log(res)
        this.results = res['items']
      },
      (error:Response) =>  {
        console.log('Error')
        console.log(error)
        console.log(error.status)
        console.log(error.text())
      }
    )
  }

}
