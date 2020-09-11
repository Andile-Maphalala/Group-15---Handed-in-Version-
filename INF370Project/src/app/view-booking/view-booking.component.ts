import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../booking.service';
import { Booking } from '../booking';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  allBookings:any;
  booking = new Booking();
  searchedKeyword: string;
  constructor(private httpService: HttpClient,private bookingService:BookingService) { }  
  EMPLOYEEs: string[];  
  DATEs: string[]; 
  SLOTs: string[];
  ngOnInit() { 
     
    this.loadSlots()};
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      // this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  loadSlots()
  { this.httpService.get('http://localhost:30135/Api/GetAvailableSlots/Slots').subscribe(  
    data => { this.allBookings =data;
     this.EMPLOYEEs = data as unknown as string [];  
     this.DATEs = data as unknown as string []
     this.SLOTs = data as unknown as string []
    }  
  ); }
  
  OnSubmit1(BOOKINGID){debugger;
    this.booking.BOOKINGID=BOOKINGID;
    this.booking.CLIENTID=Number(sessionStorage.getItem('clientID')); //to be changed to dynammic value
    this.booking.PROPERTYID=1; //to be changed to dynammic value
    this.bookingService.UpdateBooking(this.booking).subscribe(data=>{});
    this.loadSlots();
    
  }

}
