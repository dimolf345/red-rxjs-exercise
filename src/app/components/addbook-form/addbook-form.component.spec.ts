import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbookFormComponent } from './addbook-form.component';

describe('AddbookFormComponent', () => {
  let component: AddbookFormComponent;
  let fixture: ComponentFixture<AddbookFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddbookFormComponent]
    });
    fixture = TestBed.createComponent(AddbookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
