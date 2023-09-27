import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { compareSets } from '../spec-helper';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, ReactiveFormsModule],
      declarations: [BooksComponent],
      providers: [{provide: ActivatedRoute, useValue: {
        params: of({id: 123})}}]
    });
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('displays a form to insert Book Title, author, pages, pubYear, description and imageUrl ', () => {
    const inputIds = new Set(["title", "author", "pages", "pubblicationYear", "imageUrl"])
    const {debugElement} = fixture
    const inputs = debugElement.queryAll(By.css('input'))
    expect(inputs).toBeTruthy()
    const actualInputsSet = new Set()
    inputs.forEach((input)=> {
      actualInputsSet.add(input.nativeElement.id)
    })
    expect(compareSets(inputIds, actualInputsSet)).toBeTruthy()
  });
});
