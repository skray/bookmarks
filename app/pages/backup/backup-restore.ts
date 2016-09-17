import {Component} from '@angular/core'
import {ModalController, NavController, LoadingController, NavParams} from 'ionic-angular'
import {Response} from '@angular/http'

import {DropboxAuthModal} from '../dropbox-auth/dropbox-auth'
import {Dropbox} from '../../services/dropbox'
import {Entry} from '../../models/Entry'
import {EditBackupPage} from './edit-backup'

@Component({
  templateUrl: './build/pages/backup/backup-restore.html',
  providers: [Dropbox]
})
export class BackupRestorePage {

  private files:Array<Entry> = []

  constructor(
    public nav: NavController,
    public dropbox: Dropbox,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {

  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Checking for authentication...',
      dismissOnPageChange: true
    })
    loading.present()

    this.dropbox.isAlreadyAuthorized().then((isAuthorized) => {
      loading.dismiss().then(() =>{
        if(!isAuthorized) {
          let modal = this.modalCtrl.create(DropboxAuthModal)
          modal.onDidDismiss(data => {
            this.loadBackups()
          })
          modal.present()
        } else {
          this.loadBackups()
        }
      })
    })
  }

  public write() {
    let loading = this.loadingCtrl.create({
      content: 'Backing up...',
      dismissOnPageChange: true
    })
    loading.present()
    this.dropbox.write().subscribe(
      (file:Entry) => {
        loading.dismiss()
        this.files.splice(0,0,file)
      },
      (error:Response) =>  {
        console.log('Error')
        console.log(error.status)
        console.log(error.text())
      }
    )
  }

  public viewDetail(file:Entry) {
    this.nav.push(EditBackupPage, {file:file})
  }

  private loadBackups() {
    this.dropbox.list().subscribe(
      (files:Array<Entry>) => {
        this.files = files.reverse()
      },
      (error:Response) =>  {
        console.log('Error')
        console.log(error.status)
        console.log(error.text())
      }
    )
  }
}
