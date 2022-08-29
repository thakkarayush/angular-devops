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

  email=""
  password=""

  constructor(private sessionService: SessionService,private toastr:ToastrService,private router:Router,private authTokenService:AuthTokenServiceService) { }

  ngOnInit(): void {
  }

  login(){
    let user = {"email":this.email,"password":this.password}
    this.sessionService.loginApi(user).subscribe(resp => {
      
      //json
      console.log(resp.data.user);
      let authToken = resp.data.user.authToken
      localStorage.setItem("authToken",authToken)
      
      this.toastr.success("Login done")
      this.authTokenService.authToken = resp.data.user.authToken
      if(resp.data.user.role.roleName=="user"){
        this.router.navigateByUrl("/user/home")
      }else if(resp.data.user.role.roleName=="admin"){
        this.router.navigateByUrl("/dashboard")
      }
    },err => {
      this.toastr.error("Inavlid Credentials...","401")
    })
  }

}
