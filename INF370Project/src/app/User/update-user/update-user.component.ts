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
import { DisplayUser } from 'src/app/Classes/DisplayUser';
import { Client } from 'src/app/Classes/Client';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private _Router : Router ,private formbulider: FormBuilder,private userservice:UserService) { }
  selection : number = 1;
  options = [
    {id : 1, text: "Yes", value : true},
    {id : 2, text: "No", value : false},
  ];

  client  = new AddUser();
  userForm = new FormGroup({
    Name : new FormControl(this.client.Name,[Validators.required, Validators.pattern("[A-Za-z ]*")]),
    Surname : new FormControl(this.client.Surname, [Validators.required, Validators.pattern("[A-Za-z ]*")]),
    PhoneNo : new FormControl(this.client.PhoneNo, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    Email : new FormControl(this.client.Email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    PassportNo : new FormControl(this.client.PassportNo, [Validators.required, Validators.pattern("[0-9 ]*")]),
    Nationality : new FormControl(this.client.Nationality, Validators.required),
    DOB : new FormControl(this.client.DOB, Validators.required),
    IsStudent : new FormControl(this.client.IsStudent, Validators.required),
    Residental :new FormControl(this.client.Residental, Validators.required),
    Postal : new FormControl(this.client.Postal, Validators.required),
    Employer : new FormControl(this.client.Employer, Validators.required),
    Occupation : new FormControl(this.client.Occupation, [Validators.required, Validators.pattern("[A-Za-z ]*")]),
    WorkAddress : new FormControl(this.client.WorkAddress, Validators.required),
    WorkTel : new FormControl(this.client.WorkTel, [Validators.required, Validators.pattern("[0-9 ]*")]),
    GrossSalary : new FormControl(this.client.GrossSalary, [Validators.required, Validators.pattern("[0-9 ]*")]),
    
  })

  CurrentUser = "";
   ID : number;
  ngOnInit(): void {
    window.sessionStorage.setItem("UserID","2");
    var ID = parseInt(window.sessionStorage.getItem("UserID"))
    
    this.getUser(ID);

   
this.CurrentUser = window.sessionStorage.getItem('username');
  }

  getUser(ID : number){
    this.userservice.getUser(ID).subscribe(
    (client : Client) => this.editUser(client),
    (err: any) => console.log(err)
    ),
    this.userservice.getUser(ID).subscribe(
    (client : Client) => this.client = client);
   
  }

  editUser(client : Client){

    if (client.IsStudent == true)
    {
      this.selection = 2
      Boolean 
    }
    else{
      this.selection = 1
    }
    this.userForm.patchValue({
      Name : client.Name,
      Surname : client.Surname,
      PhoneNo : client.PhoneNo,
      Email : client.Email,
      PassportNo : client.PassportNo,
      Nationality : client.Nationality,
      DOB : client.DOB,
      //IsStudent : this.selection,
      IsStudent : client.IsStudent,
      Residental :client.Residental,
      Postal : client.Postal,
      Employer : client.Employer,
      Occupation : client.Occupation,
      WorkAddress : client.WorkAddress,
      WorkTel : client.WorkTel,
      GrossSalary : client.GrossSalary
      
    
    })


}

OnSubmit(){
  this.client = this.userForm.value;

  this.client.ID = this.ID;
  this.userservice.UpdateUserPost(this.client)
  document.getElementById("openModalButton").click();
  this._Router.navigate(['view-user'])

}

}

