import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private app: AppComponent) {
  }

  ngOnInit(): void {
  }

  toggleNavBar() {
    this.app.toggleNavBar();
  }

}
