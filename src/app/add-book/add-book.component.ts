import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  newBookForm!: FormGroup;
  coverImg: string = '';
  atlText: string = '';

  constructor(private Router: Router) {}

  ngOnInit(): void {
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
}
