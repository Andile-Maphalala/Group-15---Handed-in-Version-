import { Component, OnInit } from '@angular/core';
import { MakePaymentService } from '../make-payment.service';
import { BookingService } from '../booking.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AcceptRentalAgree } from 'src/app/accept-rental-agree';
@Component({
  selector: 'app-accept-rental-agreement',
  templateUrl: './accept-rental-agreement.component.html',
  styleUrls: ['./accept-rental-agreement.component.css']
})
export class AcceptRentalAgreementComponent implements OnInit {
  allAgreements:any;
  Checked:boolean;
  acceptRentalAgree= new AcceptRentalAgree();
  constructor(private httpService: HttpClient,private bookingService:BookingService ) { }

  ngOnInit(): void {
    this.GetAllAgreements();
    
  }
  GetAllAgreements(){
     this.bookingService.getAgreements(this.bookingService.RENTALAPPLICATIONID.toString()).toPromise().then(data => {//ClientID
       this.allAgreements = data; debugger;
      console.log(data);
       debugger;
    });
}
Submit(ph){debugger;
  if (this.Checked==true){
    this.acceptRentalAgree.PROPERTYID=ph;
    this.acceptRentalAgree.CLIENTID=sessionStorage.getItem('clientID');
    this.bookingService.addRentalAgreement(this.acceptRentalAgree).subscribe();

  }
}
ChangeToTrue(){
  this.Checked=true;
}

ChangeToFalse(){
  this.Checked=false;
}
  }