import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { CommonModule } from '@angular/common';
import { TaskInputComponent } from './components/task-input/task-input.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskInputComponent, TaskListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data as any; // OR data.tasks if you know the shape
    });
  }

  addTask(title: string) {
    this.taskService.addTask(title).subscribe((task) => {
      this.tasks.push(task);
    });
  }

  toggleComplete(id: number) {
    this.taskService.toggleComplete(id).subscribe((updatedTask) => {
      const index = this.tasks.findIndex((t) => t.id === id);
      if (index > -1) this.tasks[index] = updatedTask;
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    });
  }
}
