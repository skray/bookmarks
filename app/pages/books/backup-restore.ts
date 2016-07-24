import {Component} from '@angular/core'
import {Modal, NavController} from 'ionic-angular'
import {EditBookModal} from './edit-book'
import {Book} from './Book';
import * as storager from '../../storager/storager';

@Component({
  templateUrl: './build/pages/books/backup-restore.html'
})
export class BackupRestorePage {

  constructor(public nav: NavController) {
  }
}
