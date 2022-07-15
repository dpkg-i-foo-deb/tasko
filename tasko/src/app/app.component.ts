import { Component, ViewChild } from '@angular/core';

//Weird stuffies
import { DomSanitizer } from '@angular/platform-browser'

//Material stuffies
import { MatIconRegistry } from '@angular/material/icon'
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/menu.svg')
    )

  }

  title = 'tasko';

  openNavBar() {
    this.sidenav.open();
  }

  closeNavBar() {
    this.sidenav.close();
  }

  toggleNavBar() {
    this.sidenav.toggle();
  }
}
