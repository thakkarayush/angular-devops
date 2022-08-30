import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthTokenServiceService } from '../auth-token-service.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ""
  password = ""

  constructor(private sessionService: SessionService, private toastr: ToastrService, private router: Router, private authTokenService: AuthTokenServiceService) { }

  ngOnInit(): void {
  }

  login() {
    let user = { "email": this.email, "password": this.password }
    this.sessionService.loginApi(user).subscribe(resp => {

      //json 
      console.log(resp.data.user);
      let authToken = resp.data.user.authToken
      localStorage.setItem("authToken", authToken)
      localStorage.setItem("userId",resp.data.user.userId)
      localStorage.setItem("email",resp.data.user.email)
      localStorage.setItem("firstName",resp.data.user.firstName)
      this.toastr.success("Login done"+resp.data.user.authToken)

      this.authTokenService.authToken = resp.data.user.authToken
      this.authTokenService.userId = resp.data.user.userId 
      if (resp.data.user.role.roleName == "user") {
        this.toastr.success("Login done "+resp.data.user.authToken)
        this.router.navigateByUrl("/user/home")
      } else if (resp.data.user.role.roleName == "admin") {
        this.toastr.success("Login done "+resp.data.user.authToken)
        this.router.navigateByUrl("/dashboard")
      } else {
        this.toastr.error("User type not found...")
      }


    }, err => {
      this.toastr.error("Invalid Credentials....", "401")
    })
  }


}