import { Component, OnInit } from '@angular/core';
import { BookService } from '../core/services/book.service';
import { BehaviorSubject, Observable, filter, switchMap, tap } from 'rxjs';
import { Book } from '../core/models/book.interface';
import { BooksFilters } from '../core/models/booksFilters.interface';

@Component({
  selector: 'app-home',
  template: `
    <div>
      <app-search-form [search]="$query"></app-search-form>
      <app-booklist
        [books]="($searchedBooks | async) || ($books | async) || []"
      ></app-booklist>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  $books: Observable<Book[]> = new Observable<Book[]>();
  $query: BehaviorSubject<BooksFilters | null> =
    new BehaviorSubject<BooksFilters | null>(null);
  $searchedBooks: BehaviorSubject<Book[] | null> = new BehaviorSubject<
    Book[] | null
  >(null);

  constructor(private bookService: BookService) {}

  //$queryObj is updated by app-search-form component.
  //Each time the user modifies the form, $searchedBooks is updated
  //and passed as input to app-booklist.
  ngOnInit(): void {
    this.bookService
      .initBookService()
      .then(() => (this.$books = this.bookService.$books));

    this.$query.subscribe((queryObj) => {
      this.$books
        .pipe(
          switchMap(() => this.bookService.findBooks(queryObj!)),
          tap((filteredBooks) => {
            this.$searchedBooks.next(filteredBooks);
          })
        )
        .subscribe();
    });
  }
}
