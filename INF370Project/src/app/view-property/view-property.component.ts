import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ApiService} from '../api.service';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';


@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {
  allProperty:any;  
  constructor(private router:Router,private formbuilderUpdate:FormBuilder,private ApiService:ApiService,private bookingService:BookingService,private applicationService:MyServiceService) { }

  ngOnInit(): void {

this.loadPropertyDetails();

  }


  loadPropertyDetails(){

    this.ApiService.getPropertyByReference(this.ApiService.PropertyID.toString()).toPromise().then(data => {
      debugger;
      console.log(data);
      this.allProperty = data;});
  }

  makeBooking(PropertyID){
    this.bookingService.PropertyID=PropertyID;

    this.router.navigate(['/booking']);

  }

  apply(PropertyID){
    this.applicationService.PropertyID=PropertyID;

    this.router.navigate(['/apply']);

  }
}
