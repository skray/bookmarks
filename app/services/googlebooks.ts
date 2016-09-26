import {Injectable, Inject} from '@angular/core'
import {Http, Headers, Response, URLSearchParams} from '@angular/http'
import {Observable} from 'rxjs'

import {GoogleBookSearchResult} from '../models/GoogleBookSearchResult'
import {googleBooksKey} from './api-keys'

@Injectable()
export class GoogleBooks {

  constructor(
    public http: Http
  ) {
  }

  public searchBooks(searchStr:string) {
    let params = new URLSearchParams()
    params.set('key', googleBooksKey)
    params.set('q', searchStr)
    params.set('printType', 'books')
    params.set('maxResults', '40')

    return this.http.get(`https://www.googleapis.com/books/v1/volumes`, {search: params})
      .map((res:Response) =>  {
        let items:Array<any> = res.json()['items']
        let searchResults:Array<GoogleBookSearchResult> = new Array<GoogleBookSearchResult>()

        if(items) {
          items.forEach(item => {
            if(item['volumeInfo']) {
              searchResults.push(new GoogleBookSearchResult(
                item['volumeInfo']['title'],
                item['volumeInfo']['authors'] ? item['volumeInfo']['authors'][0] : null,
                item['volumeInfo']['description'],
                item['volumeInfo']['publishedDate'] ? item['volumeInfo']['publishedDate'].split('-')[0] : null,
                item['volumeInfo']['imageLinks'] ? item['volumeInfo']['imageLinks']['smallThumbnail'] : null
              ))
            }
          })
        }
        return searchResults
      })
  }
}
