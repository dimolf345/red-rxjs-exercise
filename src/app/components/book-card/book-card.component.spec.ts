import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import mockBooks from 'src/app/core/mocks/mockBooks';
import { Book } from 'src/app/core/models/book.interface';
import { RouterTestingModule } from '@angular/router/testing';
import {  click, queryByCss } from 'src/app/spec-helper';


describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  const mockBook: Book = (mockBooks as Book[])[1] 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule],
      declarations: [BookCardComponent]
    });
    fixture = TestBed.createComponent(BookCardComponent);
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
    spyOn(component, 'onClickDelete')
    click(fixture, 'delete-btn')
    fixture.detectChanges()
    expect(component.onClickDelete).toHaveBeenCalled()
  })
});
