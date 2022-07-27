import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Api } from 'src/app/api/api';

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
    this.dialogRef.close({ data: this.task });
  }
}
