import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../shared/types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RatingModule, FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent implements OnInit {
  @Input() book!: Book;
  @Output() selectedBook: EventEmitter<Book> = new EventEmitter<Book>();

  ngOnInit(): void {
    this.selectedBook.emit(this.book);
  }
}
