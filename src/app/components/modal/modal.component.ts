import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Book } from '../../shared/types';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    RatingModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnChanges {
  constructor(private formBuilder: FormBuilder) {}

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

  specialCharValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
        control.value
      );
      return hasSpecialChar ? { hasSpecialChar: true } : null;
    };
  }

  bookForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharValidator()]],
    image: [''],
    author: ['', [Validators.required, this.specialCharValidator()]],
    rating: [0],
  });

  ngOnChanges() {
    this.bookForm.patchValue(this.book);
  }

  onConfirm() {
    const { name, image, author, rating } = this.bookForm.value;

    this.confirm.emit({
      name: name || '',
      image: image || '',
      author: author || '',
      rating: rating || 0,
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
