import { Component, ViewChild } from '@angular/core';

//Weird stuffies
import { DomSanitizer } from '@angular/platform-browser';

//Material stuffies
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { Api } from './api/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private api: Api
  ) {
    this.matIconRegistry.addSvgIcon(
      'menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/menu.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'home',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/home.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'login',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/login.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'sign-up',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/sign-up.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/dashboard.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/edit.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/delete.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'mark',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/check.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'pending',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/clock.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'sign-out',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/sign-out.svg')
    );
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

  signOut() {
    this.api.signOut().subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
