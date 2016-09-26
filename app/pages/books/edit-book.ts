import {Alert, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {NavParams, AlertController} from 'ionic-angular';
import {Book} from '../../models/Book';
import * as storager from '../../services/storager';

@Component({
  templateUrl: './build/pages/books/edit-book.html'
})
export class EditBookPage {
  public book:Book;
  public flags = {creating: true};

  constructor(
      public params: NavParams,
      public navCtrl: NavController,
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
    this.navCtrl.popToRoot();
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
