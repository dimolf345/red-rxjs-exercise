import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBookRoutingModule } from './add-book-routing.module';
import { AddBookComponent } from './add-book.component';
import { AddbookFormComponent } from '../components/addbook-form/addbook-form.component';


@NgModule({
  declarations: [
    AddBookComponent,
    AddbookFormComponent
  ],
  imports: [
    CommonModule,
    AddBookRoutingModule
  ]
})
export class AddBookModule { }
