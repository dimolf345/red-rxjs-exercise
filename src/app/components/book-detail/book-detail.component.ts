import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RxDocument } from 'rxdb';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/core/models/book.interface';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-book-detail',
  template: ` <div class="book" *ngIf="this.book | async as book">
    <a class="go-back btn btn--primary" routerLink=""
      ><span class="sr-only">Go to home</span>
      <fa-icon [icon]="this.leftIcon"></fa-icon>
    </a>
    <div>
      <h2 class="book__title">{{ book.title }}</h2>
      <p class="book__author">{{ book.author }}</p>
    </div>
    <div class="book__cover">
      <img [src]="book.imageUrl" [alt]="book.title + ' cover'" />
    </div>
    <div class="book__info">
      <div>
        <h3>Pages</h3>
        <p>{{ book.pages }}</p>
      </div>
      <div>
        <h3>Year</h3>
        <p>{{ book.pubblicationYear }}</p>
      </div>
    </div>
    <p class="book__description">{{ book.description }}</p>
    <div class="book__actions">
      <a [routerLink]="['..', 'edit', book.id]" class="btn btn--primary"
        >Edit Book</a
      >
      <button class="btn btn--accent">Delete Book</button>
    </div>
  </div>`,
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  bookId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  book: BehaviorSubject<RxDocument<Book> | null> =
    new BehaviorSubject<RxDocument<Book> | null>(null);
  leftIcon = faArrowLeft;

  constructor(
    private _route: ActivatedRoute,
    private bookService: BookService
  ) {
    this._route.params.subscribe((params) => this.bookId.next(params.id));
  }

  ngOnInit(): void {
    this.bookService.initBookService().then(() => {
      this.bookId.subscribe(async (bookId) => {
        this.book.next(await this.bookService.findBook(bookId));
      });
    });
  }
}
