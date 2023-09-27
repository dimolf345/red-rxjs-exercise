import { Component, EventEmitter, OnInit } from '@angular/core';
import { BookService } from '../core/services/book.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Book } from '../core/models/book.interface';
import { BooksFilters } from '../core/models/booksFilters.interface';

@Component({
  selector: 'app-home',
  template: `
    <div>
      <app-search-form
      (newSearch)="searchBooks($event)"></app-search-form>
      <app-booklist
        [books]="searchedBooks || ($books | async) || []"
      ></app-booklist>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  $books: Observable<Book[]> = new Observable<Book[]>();
  $searchedBooks: BehaviorSubject<Book[] | null> = new BehaviorSubject<
    Book[] | null
  >(null);
  searchedBooks!: Book[] 

  constructor(private bookService: BookService) {}

 async searchBooks(query: any): Promise<void> {
    this.searchedBooks = await this.bookService.findBooks(query)
  }

  ngOnInit(): void {
    this.bookService
      .initBookService()
      .then(() => (this.$books = this.bookService.$books));
  }
}
