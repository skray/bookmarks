import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs'

import {goodreadsKey} from './api-keys';

@Injectable()
export class GoodReads {

  constructor(
    public http: Http
  ) {
  }

  public searchBooks(searchStr:string) {
    let params = new URLSearchParams()
    params.set('key',goodreadsKey)
    params.set('q', searchStr)

    return Observable.fromPromise(new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open("GET", `https://www.goodreads.com/search/index.xml?key=${goodreadsKey}&q=${encodeURIComponent(searchStr)}`)
      console.log('Sending request')
      xhr.setRequestHeader('Access-Control-Allow-Origin','*')
      xhr.onreadystatechange = function () {
        console.log(`State change to ${xhr.readyState}`)
        if (xhr.readyState === 4) {
          console.log(`Status is ${xhr.status}`)
          if (xhr.status === 200) {
            let response = []
            console.log(xhr.responseXML)
            resolve(response)
          } else {
            console.log(xhr.response)
            reject(xhr.response)
          }
        }
      }

      xhr.send()
    }));

    // return this.http.get(`https://www.goodreads.com/search/index.xml`, {search: params})
    //   .map(res =>  {
    //     let root = new this.window.DOMParser().parseFromString(res.text(), "text/xml")
    //     let bookNodes = root.getElementsByTagName('work')
    //     console.log(bookNodes)
    //     return <Array<any>>bookNodes
    //   })
  }
}
