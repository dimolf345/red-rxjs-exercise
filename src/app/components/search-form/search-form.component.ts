import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  concatMap,
  debounceTime,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { BooksFilters } from 'src/app/core/models/booksFilters.interface';

@Component({
  selector: 'app-search-form',
  template: `
    <form class="form" [formGroup]="$f" aria-label="Search books">
      <div class="form__control">
        <label for="titleSearch">Title</label>
        <input
          class="btn"
          id="titleSearch"
          formControlName="title"
          type="text"
          placeholder="Search Form by titles"
        />
      </div>
      <div class="form__control">
        <label for="pages-filter">Pages</label>
        <select class="btn" id="pages-filter" formControlName="pages">
          <option value="0" selected><span>All</span></option>
          <option value="100"><span>Up to 100</span></option>
          <option value="200"><span>Up to 200</span></option>
          <option value="300"><span>Up to 300</span></option>
          <option value="400"><span>More than 400</span></option>
        </select>
      </div>
    </form>
  `,
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  $f: FormGroup = new FormGroup({
    title: new FormControl(''),
    pages: new FormControl(0, Validators.min(0)),
  });

  @Input('search')
  $search: BehaviorSubject<BooksFilters | null> =
    new BehaviorSubject<BooksFilters | null>(null);

  ngOnInit(): void {
    this.$f.valueChanges.pipe(debounceTime(250)).subscribe((search) => {
      this.$search?.next(search);
    });
  }
}
