import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Api } from 'src/app/api/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private tasks!: Task[];

  constructor(private api: Api) { }

  ngOnInit(): void {

    this.api.getAllTasks().subscribe((response) => {
      this.tasks = response ?? []
    })

  }

}
