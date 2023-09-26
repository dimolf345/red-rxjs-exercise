import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooktileComponent } from './booktile.component';
import mockBooks from 'src/app/core/mocks/mockBooks';
import { Book } from 'src/app/core/models/book.interface';
import { queryByCss, click } from 'src/app/spec-helper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from 'src/app/core/services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


interface IMockBookService {
  deleteBook: () => Promise<Book>
}

describe('BooktileComponent', () => {
  let component: BooktileComponent;
  let fixture: ComponentFixture<BooktileComponent>;
  let mockBookService: IMockBookService;
  const mockBook: Book = (mockBooks as Book[])[1] 

  beforeEach(() => {
    mockBookService = jasmine.createSpyObj('BookService', ['deleteBook'])
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule],
      declarations: [BooktileComponent],
      providers: [{
        provide: BookService,
        useValue: mockBookService
      }],
    });
    fixture = TestBed.createComponent(BooktileComponent);
    component = fixture.componentInstance;
    component.book = mockBook
    fixture.detectChanges();
  });

  it('shows title, author and cover image', () => {
    const img = queryByCss(fixture, 'img')
    expect(img.attributes.src).toBe(mockBook.imageUrl)
    const title = queryByCss(fixture, 'h3')
    expect(title).toBeTruthy()
    expect(title.nativeElement.textContent).toBe(mockBook.title)
    const author = queryByCss(fixture, 'p')
    expect(author).toBeTruthy()
    expect(author.nativeElement.textContent).toBe(mockBook.author)
  });

  it('Has a button to delete the book', ()=> {
    const deleteButton = queryByCss(fixture, 'button')
    expect(deleteButton).toBeTruthy()
    click(fixture, 'delete-btn')
    fixture.detectChanges()
    expect(mockBookService.deleteBook).toHaveBeenCalled()
  })
});
