import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistComponent } from './booklist.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import mockBooks from 'src/app/core/mocks/mockBooks';
import { Book } from 'src/app/core/models/book.interface';
import { BookCardComponent } from '../book-card/book-card.component';
import { BooktileComponent } from '../booktile/booktile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('BooklistComponent', () => {
  let component: BooklistComponent;
  let fixture: ComponentFixture<BooklistComponent>;
  let mockedBooks: Book[] = mockBooks as Book[]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule],
      declarations: [BooklistComponent, BookCardComponent, BooktileComponent]
    });
    fixture = TestBed.createComponent(BooklistComponent);
    component = fixture.componentInstance;
    component.books = mockedBooks
    fixture.detectChanges();
  });

  it('renders the list of books', () => {
    const {debugElement} = fixture
    const li = debugElement.queryAll(By.css('li'))
    expect(li.length).toBe(mockBooks.length)
  });


  it('renders book-card or book-tile component base on screen width (768px)' ,()=> {
    const {debugElement} = fixture
    component.$isMobile = of(false)
    fixture.detectChanges()
    const firstBookCard = debugElement.query(By.directive(BookCardComponent))
    const firstBookTile = debugElement.query(By.directive(BooktileComponent))
    expect(firstBookCard).toBeTruthy()
    expect(firstBookTile).not.toBeTruthy();

    component.$isMobile = of(true)
    fixture.detectChanges()
    const secondBookCard = debugElement.query(By.directive(BookCardComponent))
    const secondBookTile = debugElement.query(By.directive(BooktileComponent))
    expect(secondBookTile).toBeTruthy()
    expect(secondBookCard).not.toBeTruthy();

  })
});
