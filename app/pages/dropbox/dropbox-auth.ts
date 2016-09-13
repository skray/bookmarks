import {Component} from '@angular/core';
import {Platform, NavParams, ViewController} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {Dropbox} from './dropbox';

@Component({
  templateUrl: './build/pages/dropbox/dropbox-auth.html',
  providers: [Dropbox]
})
export class DropboxAuthModal {

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      public nav: NavController,
      public dropbox: Dropbox
  ) {
  }

  login(){
    this.dropbox.login().then((success) => {
      this.viewCtrl.dismiss();
    });
  }
}
