export interface Book {
  imageUrl: string;
  title: string;
  author: string;
  isbn: string;
  pages: number;
  pubblicationDate: Date;
  rating?: number;
  description?: string;
}
