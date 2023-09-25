import { Component, Input, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/models/book.interface';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-booklist',
  template: `
    <ul
      class="booklist"
      [ngClass]="($isMobile | async) ? '' : 'booklist--desktop'"
    >
      <div class="booklist__heading">
        <h2>{{ books.length }} book/s found</h2>
        <a class="btn btn--primary" routerLink="books">
          <fa-icon size="1x" [icon]="plusIcon"></fa-icon>
        </a>
      </div>
      <ng-container *ngIf="$isMobile | async; else cards">
        <app-booktile [book]="book" *ngFor="let book of books"> </app-booktile>
      </ng-container>
      <ng-template #cards>
        <app-book-card [book]="book" *ngFor="let book of books">
        </app-book-card>
      </ng-template>
    </ul>
  `,
  styleUrls: ['./booklist.component.scss'],
})
export class BooklistComponent implements OnInit {
  @Input()
  books: Book[] = [];
  plusIcon = faPlus;
  $isMobile!: Observable<boolean>;

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.$isMobile = this.mediaService.observeMediaQuery('max-width', 768);
  }
}
