import {Component} from '@angular/core';
import {Platform, NavParams, ViewController, AlertController} from 'ionic-angular';
import {Book} from './Book';
import * as storager from '../../storager/storager';
import {Alert, NavController} from 'ionic-angular';

@Component({
  templateUrl: './build/pages/books/edit-book.html'
})
export class EditBookModal {
  public book:Book;
  public flags = {creating: true};

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      public nav: NavController,
      private alertCtrl: AlertController
  ) {
    if(params.get('book')) {
      this.book = params.get('book');
      this.flags.creating = false;
    } else {
      this.book = new Book();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    storager.saveBook(this.book).then(() => {
      this.dismiss();
    });
  }

  promptForDelete() {
    let confirm = this.alertCtrl.create({
      title: 'Delete?',
      message: 'Really remove this book? This is for all of time, no take backs.',
      buttons: [
        { text: 'No!' },
        {
          text: 'Yes',
          handler: () => {
            let navTransition = confirm.dismiss();

            storager.deleteBook(this.book).then(() => {
              navTransition.then(() => {
                this.dismiss();
              });

            });
            return false;

          }
        }
      ]
    });
    confirm.present();
  }
}
