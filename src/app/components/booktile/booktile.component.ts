import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/core/models/book.interface';
import { BookService } from 'src/app/core/services/book.service';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-booktile',
  template: ` <div class="tile" *ngIf="book">
    <img class="tile__img" [src]="book.imageUrl || DEFAULT_IMAGE_URL" alt="" />
    <div class="tile__details">
      <h3>{{ book.title }}</h3>
      <p>{{ book.author }}</p>
      <p>{{ book.pages }} pages</p>
      <div class="tile__actions">
        <a class="btn btn--primary" [routerLink]="'details/' + book.id">
          <span class="sr-only">View More</span>
          <fa-icon [icon]="plusIcon"></fa-icon>
        </a>
        <button class="btn btn--accent" (click)="onClick()">
          <span class="sr-only">Delete book</span>
          <fa-icon [icon]="trashIcon"></fa-icon>
        </button>
      </div>
    </div>
  </div>`,
  styleUrls: ['./booktile.component.scss'],
})
export class BooktileComponent implements OnInit {
  DEFAULT_IMAGE_URL =
    'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';
  @Input()
  book: Book | undefined;
  plusIcon = faEye;
  trashIcon = faTrash;

  constructor(private bookService: BookService) {}

  async onClick() {
    await this.bookService.deleteBook(this.book!.id);
  }

  ngOnInit() {
    if (!this.book) throw new Error('Book property is required!');
  }
}
