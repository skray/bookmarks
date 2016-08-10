import {Component} from '@angular/core';
import {Modal, NavController, Loading} from 'ionic-angular';
import {DropboxAuthModal} from '../dropbox/dropbox-auth';
import {Dropbox} from '../dropbox/dropbox';

@Component({
  templateUrl: './build/pages/books/backup-restore.html',
  providers: [Dropbox]
})
export class BackupRestorePage {

  constructor(
    public nav: NavController,
    public dropbox: Dropbox
  ) {
    let loading = Loading.create({
      content: 'Checking for authentication...'
    });
    this.nav.present(loading);
    this.dropbox.isAlreadyAuthorized().then((isAuthorized) => {
      loading.dismiss();
      if(!isAuthorized) {
        let modal = Modal.create(DropboxAuthModal);
        modal.onDismiss(data => {
          this.loadBackups();
        });
        this.nav.present(modal);
      } else {
        this.loadBackups();
      }
    });
  }

  private loadBackups() {
    console.log('finally authed');
  }
}
