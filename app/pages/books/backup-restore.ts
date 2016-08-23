import {Component} from '@angular/core';
import {Modal, NavController, Loading} from 'ionic-angular';
import {DropboxAuthModal} from '../dropbox/dropbox-auth';
import {Dropbox} from '../dropbox/dropbox';
import {Response} from '@angular/http';
import {Entry} from '../dropbox/Entry';

@Component({
  templateUrl: './build/pages/books/backup-restore.html',
  providers: [Dropbox]
})
export class BackupRestorePage {

  private files:Array<Entry>;

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

  public write() {
    this.dropbox.write()
  }

  private loadBackups() {
    this.dropbox.list().subscribe(
      (files:Response) => {
        console.log(files)
      },
      (error:Response) =>  {
        console.log('Error')
        console.log(error.status)
        console.log(error.text())
      }
    )
  }
}
