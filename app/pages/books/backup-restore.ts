import {Component} from '@angular/core';
import {ModalController, NavController, LoadingController} from 'ionic-angular';
import {DropboxAuthModal} from '../dropbox/dropbox-auth';
import {Dropbox} from '../dropbox/dropbox';
import {Response} from '@angular/http';
import {Entry} from '../dropbox/Entry';

@Component({
  templateUrl: './build/pages/books/backup-restore.html',
  providers: [Dropbox]
})
export class BackupRestorePage {

  private files:Array<Entry> = [];

  constructor(
    public nav: NavController,
    public dropbox: Dropbox,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    // Causes weird overlay bug where auth modal overlays
    // with opacity 0.01 - try this again later
    // let loading = this.loadingCtrl.create({
    //   content: 'Checking for authentication...',
    //   dismissOnPageChange: true
    // });

    console.log('checking if authorized');
    // loading.present();

    this.dropbox.isAlreadyAuthorized().then((isAuthorized) => {
      // loading.dismiss();
      console.log(isAuthorized);
      if(!isAuthorized) {
        let modal = this.modalCtrl.create(DropboxAuthModal);
        modal.onDidDismiss(data => {
          this.loadBackups();
        });
        modal.present();
      } else {
        this.loadBackups();
      }
    });

  }

  public write() {
    this.dropbox.write().subscribe(
      (file:Entry) => {
        this.files.push(file);
      },
      (error:Response) =>  {
        console.log('Error')
        console.log(error.status)
        console.log(error.text())
      }
    )
  }

  private loadBackups() {
    this.dropbox.list().subscribe(
      (files:Array<Entry>) => {
        this.files = files;
      },
      (error:Response) =>  {
        console.log('Error')
        console.log(error.status)
        console.log(error.text())
      }
    )
  }
}
