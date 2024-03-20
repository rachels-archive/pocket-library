import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../shared/types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent implements OnInit {
  constructor(private confirmationService: ConfirmationService) {}

  @Input() book!: Book;
  @Output() edit: EventEmitter<Book> = new EventEmitter<Book>();
  @Output() delete: EventEmitter<Book> = new EventEmitter<Book>();

  ngOnInit(): void {}

  editBook() {
    this.edit.emit(this.book);
  }

  deleteBook() {
    this.delete.emit(this.book);
  }

  confirmDelete(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this book?',
      accept: () => {
        this.deleteBook();
      },
    });
  }
}
