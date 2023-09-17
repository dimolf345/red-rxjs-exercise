import { Injectable, OnDestroy } from '@angular/core';
import { Book } from '../models/book.interface';
import bookData from '../mocks/books.json';
import { JSONData } from '../models/JSONData.interface';
import { BehaviorSubject, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService implements OnDestroy {
  $books: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  private _books: Book[] = this.$books.value;

  constructor() {
    this.populateLibrary();
  }

  //Searchs for books saved in localStore, otherwise populates the library from core/mocks/books.json file
  private populateLibrary() {
    const savedBooks = localStorage.getItem('books');
    if (!savedBooks) {
      this.$books.next(this.readBooksFromJson(bookData as unknown as JSONData));
    } else {
      this.$books.next(JSON.parse(savedBooks));
    }
    this.$books.subscribe(() => {
      localStorage.setItem('books', JSON.stringify(this.$books.value));
      this._books = this.$books.value;
    });
  }

  private readBooksFromJson(data: JSONData): Array<Book> {
    if (!data.books) throw new Error('Data source not valid');
    const bookList = data.books.map((book) => ({
      ...book,
      pubblicationDate: new Date(book.pubblicationDate),
    }));
    return bookList || [];
  }

  addBook(book: Book): boolean {
    if (!this.getBookByIsbn(book.isbn)) {
      this._books.push(book);
      this.$books.next(this._books);
      return true;
    }
    return false;
  }

  deleteBook(searchedIsbn: string) {
    this.$books.next(this._books.filter((book) => book.isbn !== searchedIsbn));
  }

  getBookByIsbn(searchedIsbn: string): Book | undefined {
    return this._books.find((book) => book.isbn === searchedIsbn);
  }

  updateBookByIsbn(updatedBook: Book) {
    this._books.map((book) => {
      if (book.isbn === updatedBook.isbn) return updatedBook;
      return book;
    });
    this.$books.next(this._books);
  }

  ngOnDestroy(): void {
    this.$books.unsubscribe();
  }
}
