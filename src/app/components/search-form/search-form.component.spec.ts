import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

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

  it('searches for books by title', fakeAsync(() => {
    const {debugElement} = fixture
    const searchInput = debugElement.query(By.css('[data-testId="search-title"]')).nativeElement as HTMLInputElement
    expect(searchInput).toBeTruthy();
    searchInput.value = 'test search'
    searchInput.dispatchEvent(new Event('input'))
    tick(250)
    fixture.detectChanges();
    expect(component.$search.value?.title).toBe("test search")
  }));

  it('searches books by number of pages', fakeAsync(()=> {
    const {debugElement} = fixture
    const selectInput = debugElement.query(By.css('[data-testId="search-pages"]'));
    expect(selectInput).toBeTruthy()
    const options = debugElement.queryAll(By.css('option'))
    const actualPagesSelected = options[1].nativeElement.value
    selectInput.nativeElement.value = actualPagesSelected
    selectInput.nativeElement.dispatchEvent(new Event("change"))
    tick(250)
    fixture.detectChanges()
    expect(component.$search.value?.pages).toBe(Number(actualPagesSelected))

  }))
});
