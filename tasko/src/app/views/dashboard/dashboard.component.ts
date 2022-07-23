import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/api/api';
import { MatDialog } from '@angular/material/dialog'
import { NewTaskDialogComponent } from '../dialogs/new-task-dialog/new-task-dialog.component';
import {Task} from 'src/app/models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private tasks!: Task[];

  constructor(
    private api: Api,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.api.getAllTasks().subscribe((response) => {
      this.tasks = response ?? []
    })

  }

  openNewTaskDialog() {

    this.dialog.open(NewTaskDialogComponent,
      {
			width: '350px',
      })

  }

}
