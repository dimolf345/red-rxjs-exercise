import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SearchFormComponent]
    });
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
