import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Api } from 'src/app/api/api';
import { Task } from '../../../models/task';
@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.html',
  styleUrls: ['./edit-task-dialog.scss'],
})
export class EditTaskDialog implements OnInit {
  editTaskForm = new FormGroup({
    title: new FormControl(this.task.title, [Validators.required]),
    description: new FormControl(this.task.description),
    startDate: new FormControl(this.task.start_date, [Validators.required]),
    dueDate: new FormControl(this.task.due_date, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<EditTaskDialog>,
    private api: Api,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  editTask() {
    if (!this.editTaskForm.valid) {
      return;
    }

    this.task.title = this.editTaskForm.controls['title'].value ?? '';
    this.task.description =
      this.editTaskForm.controls['description'].value ?? '';
    this.task.start_date = this.editTaskForm.controls['startDate'].value ?? '';
    this.task.due_date = this.editTaskForm.controls['dueDate'].value ?? '';

    this.api
      .updateTask(this.task)
      .pipe(
        this.toast.observe({
          success: 'Edited Successfully!',
          loading: 'Editing...',
          error: 'Something Went Wrong. Try Again!',
        })
      )
      .subscribe({
        next: () => {},
        error: () => {
          this.toast.show('Failed to Edit the Task!');
        },
        complete: () => {
          this.dialogRef.close({ data: this.task });
        },
      });
  }
}
