import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs'

import {googleBooksKey} from './api-keys';

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
      .map(res =>  {
        return <Array<any>>res.json()
      })
  }
}
