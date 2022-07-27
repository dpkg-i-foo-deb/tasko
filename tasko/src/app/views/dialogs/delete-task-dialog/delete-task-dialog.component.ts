import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Api } from 'src/app/api/api';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.scss'],
})
export class DeleteTaskDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    private api: Api,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.api
      .deleteTask(this.task)
      .pipe(
        this.toast.observe({
          success: 'Deleted Successfully!',
          error: 'Failed!',
          loading: 'Deleting...',
        })
      )
      .subscribe({
        next: () => {},
        error: () => {
          this.toast.show('Could not Delete the Task!');
        },
        complete: () => {
          this.dialogRef.close({ data: this.task });
        },
      });
  }
}
