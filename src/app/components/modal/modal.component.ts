import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Book } from '../../shared/types';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() visible: boolean = false;
  @Input() header!: string;

  @Output() confirm = new EventEmitter<Book>();
  @Output() cancel = new EventEmitter<void>();

  @Input() book: Book = {
    name: '',
    image: '',
    author: '',
    rating: 0,
  };

  onConfirm() {
    this.confirm.emit(this.book);
  }

  onCancel() {
    this.cancel.emit();
  }
}
