import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Booking } from '../booking';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

import { BookingService } from '../booking.service';

@Component({
  selector: 'app-make-property-viewing-booking',
  templateUrl: './make-property-viewing-booking.component.html',
  styleUrls: ['./make-property-viewing-booking.component.css'],
 
})
export class MakePropertyViewingBookingComponent implements OnInit {
  allBookings:any;
  booking = new Booking();
  constructor(private httpService: HttpClient,private bookingService:BookingService) { }  
  EMPLOYEEs: string[];  
  DATEs: string[]; 
  SLOTs: string[];
  ngOnInit() {  
    this.loadSlots()
  }  
  OnSubmit(EMPLOYEEDATETIMESLOTID){
    this.booking.EMPLOYEEDATETIMESLOTID=EMPLOYEEDATETIMESLOTID;
    this.booking.CLIENTID=Number(sessionStorage.getItem('clientID')); 
    this.booking.PROPERTYID=this.bookingService.PropertyID; 
    this.bookingService.addBooking(this.booking).subscribe(data=>{});
    this.loadSlots();
    
  }

  loadSlots()
  { this.httpService.get('http://localhost:30135/Api/GetAvailableSlots/Slots').subscribe(  
    data => { this.allBookings =data;
    //  this.EMPLOYEEs = data as string [];  
    //  this.DATEs = data as string []
    //  this.SLOTs = data as string []
    }  
  ); }
  
}  