import {Storage, SqlStorage} from 'ionic-angular';

export class Book {

  static list() {
    let storage = new Storage(SqlStorage, {name: 'books_db', existingDatabase: true});
    return storage.query('CREATE TABLE IF NOT EXISTS book (id integer primary key, name text, rating integer, read boolean)').then(function() {
      return storage.query('select * from book');
    });
  }

  name:String;
  rating:Number;
  read:Boolean;

  constructor(properties) {
    this.name = properties.name;
    this.rating = properties.rating;
    this.read = properties.read;

    let storage = new Storage(SqlStorage, {name: 'books_db', existingDatabase: true});
    storage.query('CREATE TABLE IF NOT EXISTS book (id integer primary key, name text, rating integer, read boolean)').then(function() {
      storage.query('insert into book(name, rating, read) values (?, ?, ?)', [properties.name, properties.rating, properties.read]);
    });
  }
}
