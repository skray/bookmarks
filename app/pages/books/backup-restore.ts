import {Component} from '@angular/core'
import {Modal, NavController} from 'ionic-angular'
import {DropboxAuthModal} from '../auth/dropbox-auth'

@Component({
  templateUrl: './build/pages/books/backup-restore.html'
})
export class BackupRestorePage {

  private authorized = false;

  constructor(public nav: NavController) {
    if(!this.authorized) {
      let modal = Modal.create(DropboxAuthModal);
      modal.onDismiss(data => {
        console.log(data);
      });
      this.nav.present(modal);
    }
  }
}
