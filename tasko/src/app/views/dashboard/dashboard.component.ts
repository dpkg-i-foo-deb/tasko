import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/api/api';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskDialogComponent } from '../dialogs/new-task-dialog/new-task-dialog.component';
import { Task } from 'src/app/models/task';
import { HttpErrorResponse } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  doneTasks: Task[] = [];
  pendingTasks: Task[] = [];
  selectedTasks: Task[] = [];

  constructor(
    private api: Api,
    private dialog: MatDialog,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.api.getAllTasks().subscribe((response) => {
      this.tasks = response ?? [];
      this.organizeTasks();
    });
  }

  organizeTasks() {
    this.doneTasks = [];

    this.pendingTasks = [];

    for (let task of this.tasks) {
      if (task.status) {
        this.doneTasks.push(task);
      } else {
        this.pendingTasks.push(task);
      }
    }
  }

  markAsDone() {
    for (let task of this.selectedTasks) {
      task.status = true;

      this.api
        .updateTask(task)
        .pipe(
          this.toast.observe({
            success: 'Done!',
            loading: 'Marking Tasks...',
            error: 'Failed!',
          })
        )
        .subscribe({
          next: () => {},

          error: (error: HttpErrorResponse) => {
            this.toast.show('Could not mark as done!');
            console.log(error);
          },

          complete: () => {
            this.updateTask(task);
          },
        });
    }

    this.organizeTasks();
  }

  updateTask(task: Task) {
    let index = this.tasks.indexOf(task);

    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

  openNewTaskDialog() {
    this.dialog.open(NewTaskDialogComponent, {
      width: '350px',
    });
  }
}
