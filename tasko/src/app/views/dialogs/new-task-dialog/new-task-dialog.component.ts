import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Api } from 'src/app/api/api';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss'],
})
export class NewTaskDialogComponent implements OnInit {
  newTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
  });

  newTask!: Task;

  constructor(
    private api: Api,
    private toast: HotToastService,
    private dialogRef: MatDialogRef<NewTaskDialogComponent>
  ) {}

  ngOnInit(): void {}

  createTask() {
    if (this.newTaskForm.valid) {
      let task: Task = {
        code: 0,
        title: '',
        description: '',
        start_date: '',
        due_date: '',
        status: false,
        user_email: '',
      };

      task.title = this.newTaskForm.controls['title'].value ?? '';
      task.description = this.newTaskForm.controls['description'].value ?? '';
      task.start_date = this.newTaskForm.controls['startDate'].value ?? '';
      task.due_date = this.newTaskForm.controls['dueDate'].value ?? '';

      this.api
        .createTask(task)
        .pipe(
          this.toast.observe({
            success: 'Task Created Successfully!',
            loading: 'Creating new Task...',
            error: 'Failed!',
          })
        )
        .subscribe({
          next: (task: Task) => {
            this.newTask = task ?? {};
          },

          error: () => {
            this.toast.show('Could not Create the Task!');
          },

          complete: () => {
            this.dialogRef.close({ data: this.newTask });
          },
        });
    }
  }
}
