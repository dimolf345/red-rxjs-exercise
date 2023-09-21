import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookDetailComponent } from '../components/book-detail/book-detail.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: ':id', component: BookDetailComponent },
  { path: 'edit/:id', component: BooksComponent, data: {} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
