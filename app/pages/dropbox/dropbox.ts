import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import appKey from './app-key';
import {InAppBrowser} from 'ionic-native';
import * as storager from '../../storager/storager';
import {Observable} from 'rxjs'
import 'rxjs/add/operator/map';
import {Book} from '../books/Book';
import {Entry} from './Entry';
import {Backup} from './Backup';

@Injectable()
export class Dropbox {

  private authUrl:string;
  private redirectURI:string;
  private accessToken:string;

  constructor(
    public http: Http
  ) {
    this.redirectURI = 'http://localhost';
    this.authUrl = 'https://www.dropbox.com/oauth2/authorize?client_id=' + appKey + '&redirect_uri=' + this.redirectURI + '&response_type=token';
  }

  public isAlreadyAuthorized():Promise<boolean>{
    return storager.getDropboxToken().then((token) => {
      if(token) {
        this.accessToken = token;
        return true;
      }
      return false;
    });
  }

  public login() {
    return new Promise((resolve, reject) => {

      let browser = InAppBrowser.open(this.authUrl, '_blank', 'location=no,zoom=no,hardwareback=no');

      browser.addEventListener('loadstart', (event) => {

        //Ignore the dropbox authorize screen
        if(event.url.indexOf('oauth2/authorize') > -1){
          return;
        }

        //Check the redirect uri
        if(event.url.indexOf(this.redirectURI) > -1 ){
          browser.removeEventListener('exit', (event) => {});
          browser.close();
          let token = event.url.split('=')[1].split('&')[0];
          this.accessToken = token;
          storager.saveDropboxToken(token).then(resolve);
        } else {
          reject("Could not authenticate");
        }

      });

    });
  }

  public list() : Observable<Array<Entry>> {
    let body = {path: ''};
    let headers = new Headers();

    headers.append('Authorization', `Bearer ${this.accessToken}`);
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://api.dropboxapi.com/2/files/list_folder', JSON.stringify(body), {headers: headers})
      .map(res =>  <Array<Entry>>res.json().entries);
  }

  public write(): Observable<Entry> {
    return Observable.fromPromise(storager.list())
      .map((books:Array<Book>) => {
          let headers = new Headers();
          let now = new Date();
          let dropboxArgs = {path:`/backup-${now.toJSON()}.txt`, mode:'add', autorename:true, mute:true};
          let backup = new Backup(books);
          headers.append('Authorization',`Bearer ${this.accessToken}`);
          headers.append('Dropbox-API-Arg',JSON.stringify(dropboxArgs));
          headers.append('Content-Type','application/octet-stream');
          return {headers: headers, data: backup}
      })
      .switchMap((struct) => this.http.post('https://content.dropboxapi.com/2/files/upload', JSON.stringify(struct.data), {headers: struct.headers}))
      .map(res => <Entry>res.json())
  }

  public delete(file:Entry): Observable<Entry> {
    let body = {path: `/${file.name}`};
    let headers = new Headers();

    headers.append('Authorization', `Bearer ${this.accessToken}`);
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://api.dropboxapi.com/2/files/delete', JSON.stringify(body), {headers: headers})
      .map(res =>  <Entry>res.json());
  }

  public download(fileName : string): Observable<Backup> {
    let body = {path: ''};
    let headers = new Headers();

    headers.append('Authorization', `Bearer ${this.accessToken}`);
    headers.append('Dropbox-API-Arg', JSON.stringify({path: `/${fileName}`}));

    return this.http.post('https://content.dropboxapi.com/2/files/download', null, {headers: headers})
      .map(res => <Backup>res.json())
  }
}
