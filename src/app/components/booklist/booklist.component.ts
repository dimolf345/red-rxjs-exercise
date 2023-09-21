import { Component, Input } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/core/models/book.interface';

@Component({
  selector: 'app-booklist',
  template: `
    <ul class="booklist">
      <div class="booklist__heading">
        <h2>{{ books.length }} book/s found</h2>
        <a class="btn btn--primary" routerLink="books">
          <fa-icon size="1x" [icon]="plusIcon"></fa-icon>
        </a>
      </div>
      <app-booktile [book]="book" *ngFor="let book of books"> </app-booktile>
    </ul>
  `,
  styleUrls: ['./booklist.component.scss'],
})
export class BooklistComponent {
  @Input()
  books: Book[] = [];

  plusIcon = faPlus;
}
