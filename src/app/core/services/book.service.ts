import { Injectable, OnDestroy } from '@angular/core';
import { Book } from '../models/book.interface';
import { Observable } from 'rxjs';
import { BookDB } from '../db/rxdb';
import { BooksFilters } from '../models/booksFilters.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService implements OnDestroy {
  private dao!: BookDB;
  $books: Observable<Book[]> = new Observable<Book[]>();
  // private _books: Book[] = this.$books;

  constructor() {}

  async initBookService() {
    if (this.dao) return;
    const db = await BookDB.createDBInstance();
    await db.populateBookCollection();
    this.$books = db.allBooks;
    this.dao = db;
  }

  async findBooks(queryObj?: BooksFilters) {
    return await this.dao.find(queryObj);
  }

  async addBook(book: Book) {
    return await this.dao.addBook(book);
  }

  async deleteBook(bookId: string) {
    console.log('Service called');
    return await this.dao.deleteBook(bookId);
  }

  // getBookByIsbn(searchedIsbn: string): Book | undefined {
  //   return this._books.find((book) => book.id === searchedIsbn);
  // }

  // updateBookByIsbn(updatedBook: Book) {
  //   this._books.map((book) => {
  //     if (book.id === updatedBook.id) return updatedBook;
  //     return book;
  //   });
  //   this.$books.next(this._books);
  // }

  ngOnDestroy(): void {}
}
