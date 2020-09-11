import { Component, OnInit } from '@angular/core';
import { MakePaymentService } from '../make-payment.service';

import { Hash } from 'src/classes/hash';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  MD5string :string = '';
  payable=false;
  obj:Hash= new Hash();
  totalAmount = 0;
  allRentals:any; 
  searchForm: any; 
  AmountDue:any;
  selected:any;
  constructor(private apiService:MakePaymentService,private formbuilderUpdate:FormBuilder ) { }

  ngOnInit(): void {this.GetAllRentalAgreements();
    this.searchForm = this.formbuilderUpdate.group({  
  
  
      SearchBy: ['', [Validators.required]], 
      searchText: ['', [Validators.required]],   
    });
  
  }
  //Generate MD5 
    async genMD5()
  {
    this.MD5string = "merchant_id=10000100$merchant_key=46f0cd694581a$return_url=https%3A%2F%2Fnattrendstore.000webhostapp.com%2Fpaysuccess$cancel_url=https%3A%2F%2Fnattrendstore.000webhostapp.com%2Fpaycancel$amount="+this.totalAmount+"$item_name=NattrendOrder";
    //alert(this.MD5string);
    this.obj.hashString = this.MD5string;
    await this.apiService.getMD5(this.obj).toPromise().then( x =>{
      this.payable=true;
      this.MD5string = x.toString();
      //alert(this.MD5string);
    });
  }
  GetAllRentalAgreements(){
    this.apiService.getRentalAgreement("6").toPromise().then(data => {//ClientID
      this.allRentals = data; debugger;
      console.log(data);
      debugger;
    });
  }
  GetAmount(ReferenceNo:string){debugger;
    this.apiService.getAmount(ReferenceNo).toPromise().then(data => {//ClientID
      this.AmountDue = data.toString(); debugger;
      this.payable=true;
      debugger;
    });
  }
  public onOptionsSelected(event) {debugger;
    const value = event.target.value;
    this.selected = value;
    console.log(value);
 }
  }

