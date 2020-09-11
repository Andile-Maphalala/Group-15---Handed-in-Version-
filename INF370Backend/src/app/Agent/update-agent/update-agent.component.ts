import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Agent } from 'src/app/Classes/Agent';
//import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { AgentService } from 'src/app/Services/Agent.service';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class UpdateAgentComponent implements OnInit {

  constructor(private _Router : Router ,private formbulider: FormBuilder,private agentservice:AgentService) { }

  agent = new Agent();


  agentForm = this.formbulider.group({
      Name : [this.agent.NAME, [Validators.required]],
      Surname : [this.agent.SURNAME, [Validators.required]],
      PHONE_NUMBER : [this.agent.PHONE_NUMBER, [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      Email : [this.agent.EMAIL, [Validators.required]],
      Company : [this.agent.COMPANY, [Validators.required]],
});

AgentID : number

  ngOnInit(): void {
    this.AgentID = parseInt(window.sessionStorage.getItem("AgentID"))
    this.getUser(this.AgentID);
  }


  getUser(ID : number){
    this.agentservice.getAgent(ID).subscribe(
    (agent : Agent) => this.editUser(agent),
    (err: any) => console.log(err)
    ),
    this.agentservice.getAgent(ID).subscribe(
    (agent : Agent) => this.agent = agent);
   
  }

  editUser(agent : Agent){

    this.agentForm.patchValue({
      Name : agent.NAME,
      Surname : agent.SURNAME,
      PHONE_NUMBER : agent.PHONE_NUMBER,
      Email : agent.EMAIL,
      Company : agent.COMPANY
    })


}

OnSubmit(){
  this.agent = this.agentForm.value;

  this.agent.Agent_ID = this.AgentID;
  console.log(this.agent);
  this.agentservice.UpdateAgent(this.agent)
  document.getElementById("openModalButton").click();

  this._Router.navigate(['/search-agent'])


}

}
