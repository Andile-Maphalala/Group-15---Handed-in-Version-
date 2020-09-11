import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/Classes/Agent';
//import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { AgentService } from 'src/app/Services/Agent.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search-agent',
  templateUrl: './search-agent.component.html',
  styleUrls: ['./search-agent.component.css']

})
export class SearchAgentComponent implements OnInit {

  constructor(private _Router : Router ,private formbulider: FormBuilder,private agentservice:AgentService) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  allAgents : Observable<Agent[]>;
  Agents : Agent[];
  searchedKeyword: string;
  
  loadAllUsers() {  
    this.allAgents = this.agentservice.getAllAgents(); 
    //console.log(this.allAgents);
  
  }


assignAgent(ID : number){
  window.sessionStorage.setItem("AgentID",ID.toString());
  this._Router.navigate(['/assign-agent'])
}

editAgent(ID : number){
  window.sessionStorage.setItem("AgentID",ID.toString());
  this._Router.navigate(['/update-agent'])
}

deleteAgent(ID : number){
  if (confirm("Are you sure you want to delete this Agent ?")) {  
    this.agentservice.deleteAgent(ID).subscribe(() => {
      document.getElementById("openModalButton").click();
      this.loadAllUsers();
  
    });
  }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  
}
