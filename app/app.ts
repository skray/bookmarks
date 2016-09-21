

import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {BooksPage} from './pages/books/books';
import {BackupRestorePage} from './pages/backup/backup-restore';
import {SearchBooksPage} from './pages/books/search-books';

import { provide } from '@angular/core';
provide(Window, { useValue: window });

@Component({
  template: `
    <ion-menu [content]="content">
      <ion-toolbar>
      <ion-title>Menu</ion-title>
      <ion-buttons left>
        <button menuClose><ion-icon name="arrow-back"></ion-icon></button>
      </ion-buttons>
      </ion-toolbar>
      <ion-content>
        <ion-list>
          <button ion-item (click)="openPage(booksPage)">
            Books
          </button>
          <button ion-item (click)="openPage(backupRestorePage)">
            Import/Export Data
          </button>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-nav #content [root]="rootPage"></ion-nav>
  `
})
export class MyApp {

  private rootPage = SearchBooksPage;
  private booksPage = BooksPage;
  private backupRestorePage = BackupRestorePage;
  private searchBooksPage = SearchBooksPage;

  constructor(
    private platform:Platform,
    private menu: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the nav controller to have just this page
    // we wouldn't want the back button to show in this scenario
    this.rootPage = page;

    // close the menu when clicking a link from the menu
    this.menu.close();
  }
}

ionicBootstrap(MyApp)
