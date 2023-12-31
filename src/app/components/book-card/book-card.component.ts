import { Component, Input } from '@angular/core';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/core/models/book.interface';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-book-card',
  template: `
    <li class="card">
      <div class="card__image">
        <img [src]="book.imageUrl" [alt]="book.imageUrl + ' cover'" />
      </div>
      <div class="card__text">
        <h3>{{ book.title }}</h3>
        <p>{{ book.author }}</p>
      </div>
      <div class="card__actions">
        <a class="btn btn--primary" [routerLink]="'books/' + book.id">
          <span class="sr-only">View More</span>
          <fa-icon [icon]="detailsIcon"></fa-icon>
        </a>
        <a class="btn btn--primary" [routerLink]="['books', 'edit', book.id]">
          <span class="sr-only">Edit</span>
          <fa-icon [icon]="editIcon"></fa-icon>
        </a>
        <button appStopClickPropagation data-testId="delete-btn" (click)="onClickDelete($event)" class="btn btn--accent">
          <span class="sr-only">Delete book</span>
          <fa-icon [icon]="trashIcon"></fa-icon>
        </button>
      </div>
</li>
  `,
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input()
  book!: Book;

  detailsIcon = faEye;
  editIcon = faPencil;
  trashIcon = faTrash;

  constructor(private bookService: BookService) {}

  async onClickDelete(event: Event) {
    event.stopPropagation()
    const confirm = window.confirm(`Are you sure to delete ${this.book.title}`)
    if(confirm) await this.bookService.deleteBook(this.book!.id);
    else return
  }
}
