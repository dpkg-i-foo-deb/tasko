import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './util/auth-guard';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo:'home',pathMatch :'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {
    path:'home', component:HomeComponent,
  },
  {path: '**',component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
