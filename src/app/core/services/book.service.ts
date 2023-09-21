import { Injectable, OnDestroy } from '@angular/core';
import { Book } from '../models/book.interface';
import { Observable } from 'rxjs';
import { BookDB } from '../db/rxdb';
import { BooksFilters } from '../models/booksFilters.interface';
import { RxDocument } from 'rxdb';

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

  async findBook(bookId: string) {
    return await this.dao.findById(bookId);
  }

  async addBook(book: Book) {
    return await this.dao.addBook(book);
  }

  async deleteBook(bookId: string) {
    return await this.dao.deleteBook(bookId);
  }

  async updateBook(bookDocument: any, update: Book) {
    return await this.dao.updateBook(bookDocument, update);
  }

  ngOnDestroy(): void {}
}
