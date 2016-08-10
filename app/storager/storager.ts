import {Storage, SqlStorage} from 'ionic-angular';
import { Book } from '../pages/books/Book';

let db;

function init() {
  if(!db) {
    db = new Storage(SqlStorage, {name: 'books_db', existingDatabase: true});
  }
}

function generateId(list) : string {
  return Math.random().toString(36).substr(2, 9);
}

function findExistingIndex(books: Array<Book>, id:string) : number {
    return books.findIndex((el) => {
      return id && el.id === id
    });
}

function saveBooks(books:Array<Book>) {
  return db.set('books', JSON.stringify(books));
}

export function saveBook(book:Book) : Promise<any> {
  init();
  return list().then((books) => {
    if(!books) {
      return [book];
    }

    let existingIndex = findExistingIndex(books, book.id);

    if(existingIndex >= 0) {
      books[existingIndex] = book;
    } else {
      book.id = generateId(books);
      books.push(book);
    }
    return books;
  }).then(saveBooks);
}

export function deleteBook(book: Book) : Promise<any> {
  init();
  return list().then((books) => {
    let existingIndex = findExistingIndex(books, book.id);

    if(existingIndex >= 0) {
      books.splice(existingIndex);
    }
    return books;
  }).then(saveBooks);
}

export function list() : Promise<Array<Book>> {
  init();
  return db.get('books').then((data) => {
    if(!data) {
      return [];
    }
    return JSON.parse(data);
  });
}

export function saveDropboxToken(token:string) {
  init();
  return db.set('dropboxToken', token);
}

export function getDropboxToken():Promise<string>{
  init();
  return db.get('dropboxToken').then((token) => {
    return token;
  });
}
