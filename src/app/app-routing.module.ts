import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'details/:isbn', component: BookDetailComponent},
  { path: 'add-book', loadChildren: () => import('./add-book/add-book.module').then(m => m.AddBookModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
