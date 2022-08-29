import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthTokenGuard } from './auth-token.guard';
import { EditroleComponent } from './editrole/editrole.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { ViewroleComponent } from './viewrole/viewrole.component';

const routes: Routes = [
  { component: LoginComponent, path: "login" },
  { component: SignupComponent, path: "signup" },
  { component: LogoutComponent, path: "logout" },

  {
    component: UserlayoutComponent, path: "user", children: [

      { component: HomeComponent, path: "home" },
      { component: AddRoleComponent, path: "addrole" },
      { component: ViewroleComponent, path: "viewrole/:roleId" },
      {component:EditroleComponent,path:"editrole/:roleId"},
      {component:AddUserComponent,path:"adduser"}
    ], 
    //canActivate: [AuthTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }