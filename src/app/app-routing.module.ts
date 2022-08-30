import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthTokenGuard } from './auth-token.guard';
import { EditroleComponent } from './editrole/editrole.component';
import { HomeComponent } from './home/home.component';
import { ListAccountComponent } from './list-account/list-account.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { SignupComponent } from './signup/signup.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { ViewroleComponent } from './viewrole/viewrole.component';

const routes: Routes = [
  { component: LoginComponent, path: "login" },
  { component: SignupComponent, path: "signup" },
  { component: LogoutComponent, path: "logout" },
  {component:LoginComponent,path:""},

  {
    component: UserlayoutComponent, path: "user", children: [

      {component:MyHomeComponent,path:"home"},
      { component: AddRoleComponent, path: "addrole" },
      { component: ViewroleComponent, path: "viewrole/:roleId" },
      {component:EditroleComponent,path:"editrole/:roleId"},
      {component:AddUserComponent,path:"adduser"},
      {component:ListAccountComponent,path:"myaccounts"},
      {component:AddAccountComponent,path:"newaccount"},
      { component: AddPaymentComponent, path: "addpayment/:accountId" }
    ], 
    //canActivate: [AuthTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }