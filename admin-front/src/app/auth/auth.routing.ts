import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuth } from '../guards/notauth.guard';

const routes: Routes = [
  // { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuth] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
