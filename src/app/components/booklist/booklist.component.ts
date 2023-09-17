import { Component, Input } from '@angular/core';
import { Book } from 'src/app/core/models/book.interface';

@Component({
  selector: 'app-booklist',
  template: `
    <ul class="booklist">
      <h2 class="booklist__heading">
        There are {{ books.length }} book/s in your library
      </h2>
      <app-booktile [book]="book" *ngFor="let book of books"> </app-booktile>
    </ul>
  `,
  styleUrls: ['./booklist.component.scss'],
})
export class BooklistComponent {
  @Input()
  books: Book[] = [];
}
