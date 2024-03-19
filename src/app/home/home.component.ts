import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book, Books } from '../shared/types';
import { BookComponent } from '../components/book/book.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookComponent, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  books: Book[] = [];

  bookCount: number = 0;

  API_ENDPOINT = 'http://localhost:3000/books';

  onSelectBook(book: Book) {
    console.log(book);
  }

  getBooks(page: number, perPage: number) {
    this.booksService
      .getBooks(`${this.API_ENDPOINT}`, { page: page, perPage: perPage })
      .subscribe((books: Books) => {
        this.books = books.items;
        this.bookCount = books.total;
      });
  }

  editBook(book: Book, id: number) {
    this.booksService.editBook(`${this.API_ENDPOINT}/${id}`, book).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteBook(id: number) {
    this.booksService.deleteBook(`${this.API_ENDPOINT}/${id}`).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addBook(book: Book) {
    this.booksService.addBook(`${this.API_ENDPOINT}`, book).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onPageChange(event: PaginatorState) {
    this.getBooks(event?.page || 0, event?.rows || 8);
  }

  ngOnInit(): void {
    this.getBooks(0, 8);
  }
}
