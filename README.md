# bookmarks
[Ionic 2](http://ionicframework.com/docs/v2/) app to track books I want to read

This is a way for me to learn Ionic and Angular 2, while building an app that I've been wanting for a long time.
Much of this is very specific to the things I care about when trying to track the books I want to read, but it is
out here for anyone who wants to try to use it, or to see an example Ionic 2 app.

## Books list, searching and detail

Book search uses [Google's books API](https://developers.google.com/books/docs/overview). I would like to use Goodread's API eventually, but dealing with an XML API in Angular 2 is surprisingly non-trivial.

![list_screenshot](/screenshots/books_list.png)
![search_screenshot](/screenshots/books_search.png)
![detail_screenshot](/screenshots/books_edit.png)

## Backup and restore

Data is backed up to your Dropbox account as a JSON blob. 

![backup_list](/screenshots/backup_list.png)
![backup_detail](/screenshots/backup_detail.png)

## Installation

Android APKs are available on the [releases page](https://github.com/skray/bookmarks/releases). If you do not want to install someone's random binary onto your phone, pull down the project, and then follow the [Ionic 2 installation guide](http://ionicframework.com/docs/v2/getting-started/installation/).
