import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooktileComponent } from './booktile.component';

describe('BooktileComponent', () => {
  let component: BooktileComponent;
  let fixture: ComponentFixture<BooktileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooktileComponent]
    });
    fixture = TestBed.createComponent(BooktileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
