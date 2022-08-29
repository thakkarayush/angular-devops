import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  roles: Array<any>=[]
  roleName:string=""
  display=false
  constructor(private userService: UserService, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.getAllRoles()
  }

  deleteRole(id:any){
    this.userService.deleteRole(id).subscribe(resp =>{
      console.log(resp);
      

      this.toastr.success("Role Deleted...")
      this.roles = this.roles.filter(r => r.roleId != id)
    }, err=>{
      console.log(err);
      this.toastr.error(err);   
    })
  }

  viewRole(roleId:any){
    this.userService.getRoleByIdApi(roleId).subscribe(resp => {
      this.roleName = resp.roleName
        this.display=true 
      // alert(resp.roleName);
    },err=>{
      this.toastr.error(err)
    })
  }
  getAllRoles(){
    this.userService.getAllRoles().subscribe(resp=>{
      console.log("get all roles==>");
      console.log(resp);
      this.roles=resp;
    })
  }
}
