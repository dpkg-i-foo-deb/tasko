//Angular Stuffies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//Component stuffies
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { SignupComponent } from './views/signup/signup.component';

//Forms and HTTP stuffies
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material Stuffies
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

//Other stuffies
import { HotToastModule } from '@ngneat/hot-toast';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { NewTaskDialogComponent } from './views/dialogs/new-task-dialog/new-task-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { EditTaskDialog } from './views/dialogs/edit-task-dialog/edit-task-dialog';
import { DatePipe } from '@angular/common';
import { DeleteTaskDialogComponent } from './views/dialogs/delete-task-dialog/delete-task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    HomeComponent,
    DashboardComponent,
    NewTaskDialogComponent,
    EditTaskDialog,
    DeleteTaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    HotToastModule.forRoot(),
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    CookieService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
