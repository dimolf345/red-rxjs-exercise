import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../core/services/book.service';
import { Book } from '../core/models/book.interface';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  newBookForm!: FormGroup;
  coverImg: string = '';
  atlText: string = '';

  constructor(private Router: Router, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.initBookService();
    this.createForm();
    this.newBookForm.get('imageUrl')?.valueChanges.subscribe((url) => {
      this.atlText = this.newBookForm.get('title')?.value
        ? this.newBookForm.get('title')?.value + ' cover'
        : '';
      this.coverImg = url;
    });
  }

  createForm() {
    this.newBookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', Validators.required),
      pubblicationYear: new FormControl('', [
        Validators.pattern(/^[12]?\d{3}$/),
      ]),
      description: new FormControl(''),
      imageUrl: new FormControl('', {
        updateOn: 'blur',
      }),
      pages: new FormControl(1, [Validators.min(1)]),
    });
  }

  async onSubmit() {
    //Verifies if there is already a book with same title/Author and if not
    //add it to the db

    const newBook = await this.bookService.addBook({
      ...this.newBookForm.value,
    });
    console.log(newBook);
    if (newBook) this.Router.navigate(['']);
    else alert('Book not added');
  }
}
