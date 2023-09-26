import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
