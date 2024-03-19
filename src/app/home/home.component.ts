import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book, Books } from '../shared/types';
import { BookComponent } from '../components/book/book.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ModalComponent } from '../components/modal/modal.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookComponent, PaginatorModule, ButtonModule, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  API_ENDPOINT = 'http://localhost:3000/books';

  books: Book[] = [];
  bookCount: number = 0;

  selectedBook: Book = {
    id: 0,
    name: '',
    image: '',
    author: '',
    rating: 0,
  };

  showAddModal: boolean = false;
  showEditModal: boolean = false;

  openAddModal() {
    this.showAddModal = true;
  }

  openEditModal(book: Book) {
    this.selectedBook = book;
    this.showEditModal = true;
  }

  openDeletePopup(book: Book) {
    if (!book.id) {
      return;
    }
    this.deleteBook(book.id);
  }

  hideAddModal() {
    this.showAddModal = false;
  }

  hideEditModal() {
    this.showEditModal = false;
  }

  onConfirmAdd(book: Book) {
    this.addBook(book);
    this.showAddModal = false;
  }

  onAddBook() {}

  onConfirmEdit(book: Book) {
    if (!this.selectedBook.id) {
      return;
    }
    this.editBook(book, this.selectedBook.id);
    this.showEditModal = false;
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
        this.books = this.books.filter((book) => book.id !== id);
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
