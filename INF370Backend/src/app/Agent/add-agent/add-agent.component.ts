import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Agent } from 'src/app/Classes/Agent';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AgentService } from 'src/app/Services/Agent.service';


@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddAgentComponent implements OnInit {

  constructor(private _Router : Router ,private formbulider: FormBuilder,private agentservice:AgentService) { }

agent = new Agent();


  agentForm = this.formbulider.group({
    Name : [this.agent.NAME, [Validators.required]],
      Surname : [this.agent.SURNAME, [Validators.required]],
      PHONE_NUMBER : [this.agent.PHONE_NUMBER, [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      Email : [this.agent.EMAIL, [Validators.required]],
      Company : [this.agent.COMPANY, [Validators.required]],
});

  // agentForm = new FormGroup({
  //   Name : new FormControl(this.agent.NAME, Validators.required),
  //   Surname : new FormControl(this.agent.SURNAME, Validators.required),
  //   PhoneNo : new FormControl(this.agent.PHONE_NUMBER, Validators.required, Validators.pattern("[0-9 ]")),
  //   Email : new FormControl(this.agent.EMAIL, Validators.required),
  //   Company : new FormControl(this.agent.COMPANY, Validators.required),

    
  // })

  ngOnInit(): void {
  }

  OnSubmit(){
    this.agent = this.agentForm.value;
    console.log(this.agent);
    this.agentservice.AddAgent(this.agent)
    this.agentForm.reset();

  document.getElementById("openModalButton").click();
  }

}
