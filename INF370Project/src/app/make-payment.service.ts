import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Origin": '*'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MakePaymentService {
  apiURL="http://localhost:30135/";
  constructor(private http : HttpClient) { }
  //get MD5 string for PayFast
  public getMD5(obj:any){
    return this.http.post(this.apiURL+'api/MakePayment/getMD5Hash',obj,httpOptions);
  }

  getRentalAgreement(ClientID:string){ debugger;
    return this.http.get(this.apiURL+'api/MakePayment/GetProperties/'+ClientID);
  }
  getAmount(ReferenceNo:string){debugger;
    return this.http.get(this.apiURL+'api/MakePayment/GetAmountDue/'+ReferenceNo);
  }
}
