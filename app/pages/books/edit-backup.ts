import {Component} from '@angular/core'
import {ModalController, NavController, NavParams} from 'ionic-angular'
import {Backup} from '../dropbox/Backup'
import {Dropbox} from '../dropbox/dropbox'
import {Response} from '@angular/http'
import {DropboxAuthModal} from '../dropbox/dropbox-auth'
import {Rating} from '../../rating/rating';

@Component({
  templateUrl: './build/pages/books/edit-backup.html',
  providers: [Dropbox],
  directives: [Rating]
})
export class EditBackupPage {

  public backup:Backup

  constructor(
    public dropbox: Dropbox,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    let file = this.navParams.get('file')

    this.dropbox.isAlreadyAuthorized().then((isAuthorized) => {
      if(!isAuthorized) {
        let modal = this.modalCtrl.create(DropboxAuthModal)
        modal.onDidDismiss(data => {
          this.loadFile(file)
        })
        modal.present()
      } else {
        this.loadFile(file)
      }
    })
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
