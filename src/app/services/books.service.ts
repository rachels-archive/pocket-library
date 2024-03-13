import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private apiService: ApiService) {}

  getBooks(url: string, params: any): Observable<any> {
    return this.apiService.get(url, params);
  }
}
