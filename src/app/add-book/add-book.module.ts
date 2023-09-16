import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBookRoutingModule } from './add-book-routing.module';
import { AddBookComponent } from './add-book.component';


@NgModule({
  declarations: [
    AddBookComponent
  ],
  imports: [
    CommonModule,
    AddBookRoutingModule
  ]
})
export class AddBookModule { }
