import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import appKey from './app-key';
import {InAppBrowser} from 'ionic-native';
import * as storager from '../../storager/storager';

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
}
