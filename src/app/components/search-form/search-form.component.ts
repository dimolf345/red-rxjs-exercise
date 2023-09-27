import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';
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
          data-testId = "search-title"
        />
      </div>
      <div class="form__control">
        <label for="pages-filter">Pages</label>
        <select
        data-testId="search-pages"
        class="btn" id="pages-filter" formControlName="pages">
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


  @Output()
  newSearch = new EventEmitter<BooksFilters>()

  ngOnInit(): void {
    this.$f.valueChanges
      .pipe(debounceTime(250))
      .subscribe((search: BooksFilters) => {
        this.newSearch.emit({
          title: search.title,
        pages: Number(search.pages) || 0        })
      });
  }
}
