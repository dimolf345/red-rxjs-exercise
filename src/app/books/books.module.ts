import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books.routing.module';
import { BooksComponent } from './books.component';
import { AddbookFormComponent } from '../components/addbook-form/addbook-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookDetailComponent } from '../components/book-detail/book-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [BooksComponent, AddbookFormComponent, BookDetailComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class BooksModule {}
