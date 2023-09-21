import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../core/services/book.service';
import { Book } from '../core/models/book.interface';
import { BehaviorSubject } from 'rxjs';
import { RxDocument, RxDocumentBase } from 'rxdb';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  private readonly DEAFULT_IMAGE_URL =
    'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';

  newBookForm!: FormGroup;
  coverImg: string = '';
  atlText: string = '';
  bookId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  leftIcon = faArrowLeft;

  book: BehaviorSubject<RxDocument<Book> | null> =
    new BehaviorSubject<RxDocument<Book> | null>(null);

  constructor(
    private _route: ActivatedRoute,
    private Router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      if (params.id) this.bookId.next(params.id);
    });

    this.bookService.initBookService().then(() => {
      this.bookId.subscribe(async (bookId) => {
        this.book.next(await this.bookService.findBook(bookId));
      });
    });
    this.createForm();
  }

  async createForm() {
    // Creates the form group fields
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

    // Subscribes to image url input and updates the
    // src attribute of .image-preview img onBlur
    this.newBookForm.get('imageUrl')?.valueChanges.subscribe((url) => {
      this.atlText = this.newBookForm.get('title')?.value
        ? this.newBookForm.get('title')?.value + ' cover'
        : '';
      this.coverImg = url || this.DEAFULT_IMAGE_URL;
    });

    this.book.subscribe((book) => {
      if (book)
        this.newBookForm.patchValue({
          title: book.title,
          author: book.author,
          pages: book.pages,
          pubblicationYear: book.pubblicationYear,
          description: book.description,
          imageUrl: book.imageUrl,
        });
    });
  }

  async onSubmit() {
    let result;
    if (this.book.value) {
      result = await this.bookService.updateBook(
        this.book.value as any,
        this.newBookForm.value
      );
    } else {
      result = await this.bookService.addBook({
        ...this.newBookForm.value,
        id: String(Date.now()),
      });
    }
    if (result) this.Router.navigate(['']);
    else alert('Book not added');
  }
}
