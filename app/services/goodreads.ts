import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs'

@Injectable()
export class GoodReads {

  constructor(
    public http: Http
  ) {
  }

  public searchBooks(searchStr:string) : Observable<any>{

  }
}
