import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  }
  ,
  {
    path: 'admin-dashboard/:role',
    component: AdminDashboardComponent
  },
  {
    path: 'sign-up-form',
    component: SignUpFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
