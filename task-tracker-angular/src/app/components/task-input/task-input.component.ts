import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-input.component.html',
})
export class TaskInputComponent {
  @Output() taskAdded = new EventEmitter<string>();
  input: string = '';

  submit() {
    if (!this.input.trim()) return;
    this.taskAdded.emit(this.input.trim());
    this.input = '';
  }
}
