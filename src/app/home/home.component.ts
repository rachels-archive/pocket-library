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

  onSelectBook(book: Book) {
    console.log(book);
  }

  fetchBooks(page: number, perPage: number) {
    this.booksService
      .getBooks('http://localhost:3000/books', { page: page, perPage: perPage })
      .subscribe((books: Books) => {
        this.books = books.items;
        this.bookCount = books.total;
      });
  }

  onPageChange(event: PaginatorState) {
    this.fetchBooks(event?.page || 0, event?.rows || 8);
  }

  ngOnInit(): void {
    this.fetchBooks(0, 8);
  }
}
