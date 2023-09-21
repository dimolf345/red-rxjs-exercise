import { RxCollection, RxDocument } from 'rxdb';
import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { BookSchema } from './bookschema';
import mockBooks from '../mocks/mockBooks';
import { BooksFilters } from '../models/booksFilters.interface';
import { Book } from '../models/book.interface';

interface customDB {
  books: RxCollection;
}

export class BookDB {
  private books!: RxCollection;
  private readonly DEAFULT_IMAGE_URL =
    'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';

  constructor(dbInstance: customDB) {
    this.books = dbInstance.books;
  }

  static async createDBInstance() {
    const db = await createRxDatabase({
      name: 'booksdb',
      storage: getRxStorageDexie(),
      multiInstance: true,
    });

    const collections = await db.addCollections({
      books: {
        schema: BookSchema,
      },
    });
    return new BookDB(collections);
  }

  get allBooks() {
    return this.books.find().$;
  }

  async find(queryObj?: BooksFilters): Promise<Book[]> {
    let result;
    const titleRegex = new RegExp(queryObj?.title || /\w+/, 'i');
    if (queryObj && queryObj.pages > 0) {
      result = this.books.find({
        selector: {
          $and: [
            { title: { $regex: titleRegex } },
            { pages: { $gt: queryObj.pages } },
          ],
        },
      });
    } else {
      result = await this.books.find({
        selector: { title: { $regex: titleRegex } },
      });
    }
    return await result.exec();
  }

  async findById(bookId: string) {
    return (
      (await this.books
        .findOne({
          selector: { id: { $eq: bookId } },
        })
        .exec()) || null
    );
  }

  async addBook(book?: Book) {
    const isAlredyPresent = await this.books
      .find({
        selector: {
          $and: [
            { title: { $eq: book?.title } },
            { author: { $eq: book?.author } },
          ],
        },
      })
      .exec();
    if (isAlredyPresent.length === 0) {
      console.log('Adding the Book!');
      const result = await this.books.insert({
        ...book,
        imageUrl: book?.imageUrl || this.DEAFULT_IMAGE_URL,
        pages: book?.pages == 1 ? 999 : book?.pages,
      });
      return result;
    } else return null;
  }

  async populateBookCollection() {
    const books = await this.books.find().exec();
    if (books.length === 0) {
      const result = await this.books.bulkInsert(mockBooks);
      return result;
    } else return books;
  }

  async deleteBook(bookId: string) {
    const searchedBook = await this.books.findOne({
      selector: { id: { $eq: bookId } },
    });
    if (searchedBook) {
      return await searchedBook.remove();
    }
  }

  async updateBook(bookDocument: RxDocument<Book>, update: Book) {
    return await bookDocument.patch(update);
  }
}
