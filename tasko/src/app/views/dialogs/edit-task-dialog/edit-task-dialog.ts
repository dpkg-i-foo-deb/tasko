import { DatePipe } from '@angular/common';
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
    private toast: HotToastService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  editTask() {
    if (!this.editTaskForm.valid) {
      return;
    }

    let formattedDate = new Date(
      this.editTaskForm.controls.startDate.value ?? ''
    );

    let newDate = this.datePipe.transform(formattedDate, 'yyyy-MM-dd');

    this.task.title = this.editTaskForm.controls['title'].value ?? '';
    this.task.description =
      this.editTaskForm.controls['description'].value ?? '';
    this.task.start_date = newDate ?? '';

    formattedDate = new Date(this.editTaskForm.controls.dueDate.value ?? '');

    newDate = this.datePipe.transform(formattedDate, 'yyyy-MM-dd');

    this.task.due_date = newDate ?? '';

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
