import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email=""
  password=""

  constructor(private sessionService: SessionService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    let user = {"email":this.email,"password":this.password}
    this.sessionService.loginApi(user).subscribe(resp => {
      this.toastr.success("Login done")
      this.router.navigateByUrl("/home")
    },err => {
      this.toastr.error("Inavlid Credentials...","401")
    })
  }

}
