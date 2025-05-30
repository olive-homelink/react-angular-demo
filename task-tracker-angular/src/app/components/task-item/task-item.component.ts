import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onToggle() {
    this.toggle.emit(this.task.id);
  }

  onRemove() {
    this.remove.emit(this.task.id);
  }
}
