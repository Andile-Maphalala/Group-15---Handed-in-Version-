import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { AddUser } from 'src/app/Classes/AddUser';
import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/Services/User.service';
import { Injectable } from '@angular/core';
import { formatWithOptions } from 'util';
import { DisplayUser } from 'src/app/Classes/DisplayUser';
import { Check } from 'src/app/Classes/Check';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})



export class AddUserComponent implements OnInit {
  myUsers : DisplayUser[];
  allUsers : Observable<DisplayUser[]>;
  searchUser = new DisplayUser(); 

  user  = new AddUser();
  userClientForm: any; 
  found = new Check();
  send = new Check()
  isStudent: boolean=false;
  usrEx: boolean;
  
  constructor(private route:Router,private _Router : Router ,private formbulider: FormBuilder,private userservice:UserService) { }






  userForm = new FormGroup({
    Name : new FormControl(this.user.Name,[Validators.required, Validators.pattern("[A-Za-z ]*")]),
    Username : new FormControl(this.user.Name,[Validators.required]),
    Password : new FormControl(this.user.Name,[Validators.required]),
    Surname : new FormControl(this.user.Surname, [Validators.required, Validators.pattern("[A-Za-z ]*")]),
    PhoneNo : new FormControl(this.user.PhoneNo, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    Email : new FormControl(this.user.Email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    PassportNo : new FormControl(this.user.PassportNo, [Validators.required, Validators.pattern("[0-9 ]*")]),
    Nationality : new FormControl(this.user.Nationality, Validators.required),
    DOB : new FormControl(this.user.DOB, Validators.required),
    IsStudent : new FormControl(this.user.IsStudent, Validators.required),
    Residental :new FormControl(this.user.Residental, Validators.required),
    Postal : new FormControl(this.user.Postal, Validators.required),
    Employer : new FormControl(this.user.Employer, [Validators.required, Validators.pattern("[a-z ]*")]),
    Occupation : new FormControl(this.user.Occupation, [Validators.required, Validators.pattern("[a-z ]*")]),
    WorkAddress : new FormControl(this.user.WorkAddress, Validators.required),
    WorkTel : new FormControl(this.user.WorkTel, [Validators.required, Validators.pattern("[0-9 ]*")]),
    GrossSalary : new FormControl(this.user.GrossSalary, [Validators.required, Validators.pattern("[0-9 ]*")]),
    
  })
  ngOnInit(): void 
  {
    // this.userClientForm = this.formbulider.group({
    //   Name : ['', [Validators.required]],
    //   Surname : ['', [Validators.required]],
    //   PhoneNo : ['', [Validators.required]],
    //   Email : ['', [Validators.required]],
    //   Username : ['', [Validators.required]],
    //   Password : ['', [Validators.required]],
    //   PassportNo : ['', [Validators.required]],
    //   Nationality : ['', [Validators.required]],
    //   DOB : ['', [Validators.required]],
    //   IsStudent : ['', [Validators.required]],
    //   Residental :['', [Validators.required]],
    //   Postal : new FormControl('' ,Validators.required),
    //   Employer : ['', [Validators.required]],
    //   Occupation : ['', [Validators.required]],
    //   WorkAddress : ['', [Validators.required]],
    //   WorkTel : ['', [Validators.required]],
    //   GrossSalary : ['', [Validators.required]],
      
    // })
  }

  loadAllUsers() {  
    this.allUsers = this.userservice.getAllUser(); 
  }

  OnSubmit(){
    this.user = this.userForm.value;

    
  
    this.userservice.CheckUsername(this.user.Name).toPromise().then(r => {
      console.log(r);debugger;
      if(r=="true")
      {

        this.usrEx = true;
      }else{
        this.addStudent();
      }
      
    })  
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isEnabled  : boolean = true;
  onCountryChange(value){ debugger;

 if(value=="true"){

this.isStudent=true;

 }
  
  else{
    this.isStudent=false;
  }
  }


  addStudent(){
    this.user = this.userForm.value;
    debugger;

  this.userservice.AddUserPost(this.user).subscribe(dats=>{

    this._Router.navigate(['/login'])
  })
 


//document.getElementById("openModalButton").click();




    // const addStudentClient = this.userForm.value;
    // this.AddStudent(addStudentClient);
    // this.userForm.reset();



  }

  // AddStudent(addStudentClient:AddUser){



  // }

  
  AddStudent(name) {  
    this.user = this.userForm.value;
  
    this.userservice.CheckUsername(name).toPromise().then(r => {
      console.log(r);debugger;
      if(r=="true")
      {

        this.usrEx = true;
      }else{
        this.addStudent();
      }
      
    })  
} 








}



//user.Name,user.Surname,user.PhoneNo,user.Email,user.Username,
  //                     user.Password,user.PassportNo,user.Nationality,user.DOB,user.IsStudent,user.Residental,user.Postal,
  //                     user.Employer,user.Occupation,user.WorkAddress,user.WorkTel,user.GrossSalary


//   this.userClientForm = this.formbulider.group({
//     Name : ['', [Validators.required]],
//     Surname : ['', [Validators.required]],
//     PhoneNo : ['', [Validators.required]],
//     Email : ['', [Validators.required]],
//     Username : ['', [Validators.required]],
//     Password : ['', [Validators.required]],
//     PassportNo : ['', [Validators.required]],
//     Nationality : ['', [Validators.required]],
//     DOB : ['', [Validators.required]],
//     IsStudent : ['', [Validators.required]],
//     Residental :['', [Validators.required]],
//     Postal : new FormControl('' ,Validators.required),
//     Employer : ['', [Validators.required]],
//     Occupation : ['', [Validators.required]],
//     WorkAddress : ['', [Validators.required]],
//     WorkTel : ['', [Validators.required]],
//     GrossSalary : ['', [Validators.required]],
    
//   })
// }