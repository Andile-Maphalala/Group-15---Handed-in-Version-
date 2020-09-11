import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-application',
  templateUrl: './approved-application.component.html',
  styleUrls: ['./approved-application.component.css']
})
export class ApprovedApplicationComponent implements OnInit {
  allApprovedRentalApplications:any;
  booking = new Booking();
  constructor(private route:Router, private httpService: HttpClient,private bookingService:BookingService) { }  
  RENTALAPPLICATIONs: string[];  
  CLIENTs: string[]; 
  PROPERTies: string[];
  ngOnInit() { 
    this.GetApprovedApplications();
    // this.httpService.get('http://localhost:30135/Api/AcceptRentalAgreement/ApprovedApplication/').subscribe(  
    //   data => { this.allApprovedRentalApplications =data;
    //    this.RENTALAPPLICATIONs = data as string [];  
    //    this.CLIENTs = data as string []
    // //    this.PROPERTies = data as string []
    //   }  
    // );  
  }  
  OnSubmit(RENTALAPPLICATIONID){
    this.bookingService.RENTALAPPLICATIONID=RENTALAPPLICATIONID;
    this.route.navigateByUrl('/AcceptRental');
  
  }
  GetApprovedApplications(){
    this.bookingService.getAgreement(sessionStorage.getItem('clientID')).toPromise().then(data => {
      this.allApprovedRentalApplications = data; 
      console.log(data);
     
    });
  }
  
}  