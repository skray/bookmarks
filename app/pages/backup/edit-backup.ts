import {Component} from '@angular/core'
import {ModalController, NavController, LoadingController, NavParams, AlertController} from 'ionic-angular'
import {Response} from '@angular/http'

import {Backup} from '../../models/Backup'
import {Dropbox} from '../../services/dropbox'
import {DropboxAuthModal} from '../dropbox-auth/dropbox-auth'
import {Rating} from '../../components/rating'
import {Entry} from '../../models/Entry'
import * as storager from '../../services/storager'

@Component({
  templateUrl: './build/pages/backup/edit-backup.html',
  providers: [Dropbox],
  directives: [Rating]
})
export class EditBackupPage {

  public backup:Backup
  public file:Entry

  constructor(
    public dropbox: Dropbox,
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
    this.file = this.navParams.get('file')

    this.dropbox.isAlreadyAuthorized().then((isAuthorized) => {
      if(!isAuthorized) {
        let modal = this.modalCtrl.create(DropboxAuthModal)
        modal.onDidDismiss(data => {
          this.loadFile(this.file)
        })
        modal.present()
      } else {
        this.loadFile(this.file)
      }
    })
  }

  public delete() {
    let confirm = this.alertCtrl.create({
      title: 'Really?',
      message: 'Are you really sure you want to delete this backup? It will be gone forever',
      buttons: [
        { text: 'No' },
        { text: 'Yes', handler: () => {
          let loading = this.loadingCtrl.create({
            content: 'Deleting...',
            dismissOnPageChange: true
          })
          // loading.present()

          let navTransition = confirm.dismiss()

          this.dropbox.delete(this.file).subscribe(
            (entry:Entry) => {
              navTransition.then(() => this.navCtrl.pop())
            },
            (error:Response) =>  {
              console.log('Error')
              console.log(error.status)
              console.log(error.text())
            }
          )
        }
      }
      ]
    })
    confirm.present()
  }

  public restore() {
    let confirm = this.alertCtrl.create({
      title: 'Really?',
      message: 'Are you sure you want to restore all of these books?',
      buttons: [
        { text: 'No' },
        { text: 'Yes', handler: () => {
          let loading = this.loadingCtrl.create({
            content: 'Restoring...',
            dismissOnPageChange: true
          })
          loading.present()

          let restored = this.backup.books.reduce((prev, book) => {
            return prev.then(() => {
              return storager.saveBook(book)
            })
          }, new Promise((resolve) => resolve()))

          restored.then(() => {
            loading.dismiss()
          })
        }
      }
      ]
    })
    confirm.present()
  }

  private loadFile(file) {
    this.dropbox.download(file.name).subscribe(
      (backup:Backup) => {
        this.backup = backup
      },
      (error:Response) =>  {
        console.log('Error')
        console.log(error.status)
        console.log(error.text())
      }
    )
  }
}
