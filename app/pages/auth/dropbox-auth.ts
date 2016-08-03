import {Component} from '@angular/core';
import {Platform, NavParams, ViewController} from 'ionic-angular';
import {Alert, NavController} from 'ionic-angular';
import appKey from './app-key';
import {InAppBrowser} from 'ionic-native';

@Component({
  templateUrl: './build/pages/auth/dropbox-auth.html'
})
export class DropboxAuthModal {

  private authUrl:string;
  private redirectURI:string;
  private accessToken:string;

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      public nav: NavController
  ) {
    this.redirectURI = 'http://localhost';
    this.authUrl = 'https://www.dropbox.com/oauth2/authorize?client_id=' + appKey + '&redirect_uri=' + this.redirectURI + '&response_type=token';
  }

  login(){
    return new Promise((resolve, reject) => {

      let browser = InAppBrowser.open(this.authUrl, '_blank');

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
          resolve(event.url);
        } else {
          reject("Could not authenticate");
        }

      });

    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
