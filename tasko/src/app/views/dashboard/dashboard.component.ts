import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/api/api';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskDialogComponent } from '../dialogs/new-task-dialog/new-task-dialog.component';
import { Task } from 'src/app/models/task';
import { HttpErrorResponse } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';
import { EditTaskDialog } from '../dialogs/edit-task-dialog/edit-task-dialog';
import { DeleteTaskDialogComponent } from '../dialogs/delete-task-dialog/delete-task-dialog.component';

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

  removeTask(task: Task) {
    const index = this.tasks.indexOf(task);

    if (index > -1) {
      this.tasks.splice(index, 1);
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

  openEditTaskDialog() {
    this.dialog.open(EditTaskDialog, {
      width: '350px',
    });
  }

  editTask(event: any, code: number) {
    event.stopPropagation();
    let task = this.tasks.find((object) => object.code == code);
    let dialogRef = this.dialog.open(EditTaskDialog, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((data: Task) => {
      this.updateTask(data);
      this.organizeTasks();
    });
  }

  deleteTask(event: any, code: number) {
    event.stopPropagation();

    let task = this.tasks.find((object) => object.code == code);

    let dialogRef = this.dialog.open(DeleteTaskDialogComponent, { data: task });

    dialogRef.afterClosed().subscribe((data: Task) => {
      this.removeTask(data);

      this.organizeTasks();
    });
  }
}
