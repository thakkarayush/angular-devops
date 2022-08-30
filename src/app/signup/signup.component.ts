import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../session.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // firstName:string = ""
  // email=""//auto - string
  // password:string = ""

  // constructor(private tsService: ToastrService, private router: Router, private sessionService: SessionService) {
  // }

    //
  // }
  userForm: FormGroup

  constructor(private tsService: ToastrService, private router: Router, private sessionService: SessionService){
    this.userForm = new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.minLength(3)]),
      email: new FormControl('',Validators.required),
      password:new FormControl('',[Validators.required,Validators.minLength(8),this.strongPassword]),
      gender:new FormControl('Male')
    })
  }

  ngOnInit(): void {
    
  }

  signup() {
    console.log(this.userForm.value)
   
    //validate 
   
    this.sessionService.signupApi(this.userForm.value).subscribe(res => {
        if(res){
          this.tsService.success("Signup", "", { timeOut: 3000 });
          this.router.navigateByUrl("/login")      
        }
    }, err=>{
      
    })
  }
  strongPassword(password: AbstractControl): ValidationErrors | null {
    let isUpper = false
    let isLower = false
    let isSpecial = false
    let isDigit = false
    let passwordValue = password.value as string

    if (passwordValue.length < 8)
      return null

    for (let i = 0; i < passwordValue.length; i++) {
      if (passwordValue.charAt(i) >= 'A' && passwordValue.charAt(i) <= 'Z') {
        isUpper = true
      } else if (passwordValue.charAt(i) >= 'a' && passwordValue.charAt(i) <= 'z') {
        isLower = true
      }
      else if (passwordValue.charAt(i) == '$' || passwordValue.charAt(i) == '#' || passwordValue.charAt(i) == '@') {
        isSpecial = true
      }
      else if (passwordValue.charAt(i) >= '0' && passwordValue.charAt(i) <= '9') {
        isDigit = true
      }
    }

    if (isLower && isUpper && isSpecial && isDigit)
      return null
    else
      return { "strongPassword": true }
    // return null;//no errors 
  }
}