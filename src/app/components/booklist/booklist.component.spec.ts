import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistComponent } from './booklist.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('BooklistComponent', () => {
  let component: BooklistComponent;
  let fixture: ComponentFixture<BooklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [BooklistComponent]
    });
    fixture = TestBed.createComponent(BooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
