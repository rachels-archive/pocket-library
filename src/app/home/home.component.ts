import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService
      .getBooks('http://localhost:3000/clothes', { page: 0, perPage: 5 })
      .subscribe((books) => {
        console.log(books.items);
      });
  }
}
