import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName:string = ""
  email=""//auto - string
  password:string = ""

  constructor(private tsService: ToastrService, private router: Router, private sessionService: SessionService) {
  }

  signup() {
    console.log(this.firstName)
    console.log(this.email);
    console.log(this.password);
    //validate 
    let user = {
      "firstName": this.firstName,
      "email": this.email,
      "password": this.password,
      "gender": "male"
    }
    this.sessionService.signupApi(user).subscribe(res => {
        if(res){
          this.tsService.success("Signup", "", { timeOut: 3000 });
          this.router.navigateByUrl("/login")      
        }
    })
    //
  }
}