import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Book, Books, PaginationParams } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private apiService: ApiService) {}

  getBooks(url: string, params: PaginationParams): Observable<Books> {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }

  addBook(url: string, body: Book): Observable<Book> {
    return this.apiService.post(url, body, {});
  }

  editBook(url: string, body: Book): Observable<Book> {
    return this.apiService.put(url, body, {});
  }

  deleteBook(url: string): Observable<Book> {
    return this.apiService.delete(url, {});
  }
}
