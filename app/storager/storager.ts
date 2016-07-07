import {Storage, SqlStorage} from 'ionic-angular';

let db;

function init() {
  if(!db) {
    db = new Storage(SqlStorage, {name: 'books_db', existingDatabase: true});
  }
}

function generateId(list) {
  return Math.random().toString(36).substr(2, 9);
}

export function saveBook(book) {
  init();
  let books;
  list().then((result) => {
    books = result;
    if(!books) {
      return [book];
    }

    let existingIndex = books.findIndex((el) => {
      return book.id && el.id === book.id
    });

    if(existingIndex >= 0) {
      books[existingIndex] = book;
    } else {
      book.id = generateId(books);
      books.push(book);
    }
    return books;
  }).then((books) => {
    return db.set('books', JSON.stringify(books));
  });
}

export function list() {
  init();
  return db.get('books').then((data) => {
    if(!data) {
      return [];
    }
    return JSON.parse(data);
  });
}
