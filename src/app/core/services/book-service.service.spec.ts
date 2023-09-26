import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import mockBooks from '../mocks/mockBooks';
import { Book } from '../models/book.interface';
import { BookDB } from '../db/rxdb';

describe('BookServiceService', () => {
  let service: BookService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(BookService);
  });

  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
