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
    <form [formGroup]="$f" aria-label="Search books">
      <label class="sr-only" for="titleSearch">Search by title</label>
      <input
        id="titleSearch"
        formControlName="title"
        type="text"
        placeholder="Search Form by titles"
      />
      <div>
        <label for="pages-filter">Number of pages</label>
        <select id="pages-filter" formControlName="pages">
          <option value="0" selected>All</option>
          <option value="100">0-100</option>
          <option value="200">100-200</option>
          <option value="300">200-300</option>
          <option value="400">300-400</option>
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
