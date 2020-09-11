import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { DisplayUser } from '../Classes/DisplayUser';
import { AddUser } from '../Classes/AddUser';
//import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import { Complaint } from '../Classes/Complaint';


@Injectable({providedIn : 'root'})
export class ComplaintService{
url : string = "http://localhost:30135/api/Complaint/"


  httpclient: any;
    constructor(private http : HttpClient){}

getAllComplaint(): Observable<Complaint[]> {  
    return this.http.get<Complaint[]>(this.url + 'getAllComplaint');  
  }  

getComplaint(ID: number): Observable<Complaint> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Complaint>(this.url + 'GetUserByID/' + ID,httpOptions);  
  } 

 
 
  public postFile(com : Complaint, fileToUpload: File) {
    const httpOptions = { headers: new HttpHeaders({ "Access-Control-Allow-Origin" :'*' }) }
    const endpoint = this.url + 'AddComplaint';
    const formData: FormData = new FormData();
    formData.append('UserID', com.UserID.toString());
    formData.append('Details', com.Details)
    formData.append('RentalID', com.RentalID.toString())
    formData.append('Image', fileToUpload, fileToUpload.name);
   return this.http.post(endpoint, formData, httpOptions);
  }

  public UpdateFile(com : Complaint, fileToUpload: File) {
    const httpOptions = { headers: new HttpHeaders({ "Access-Control-Allow-Origin" :'*' }) }
    const endpoint = this.url + 'UpdateComplaint';
    const formData: FormData = new FormData();
    formData.append('UserID', com.UserID.toString());
    formData.append('Details', com.Details)
    formData.append('RentalID', com.RentalID.toString())
    formData.append('Image', fileToUpload, fileToUpload.name);
   return this.http.post(endpoint, formData, httpOptions);
  }

//   public UpdateFileOldImage(prod : Product) {
//     const httpOptions = { headers: new HttpHeaders({ "Access-Control-Allow-Origin" :'*' }) }
//     const endpoint = this.url + 'UpdateFileOldImage';
//     const formData: FormData = new FormData();
//     formData.append('ProductID', prod.ProductID.toString());
//     formData.append('ProductName', prod.Name);
//     formData.append('ProductDescription', prod.Description)
//     formData.append('ProductPrice', prod.Price.toString())
//     formData.append('ProductDiscount', prod.Discount.toString())
//     formData.append('Barcode', prod.Barcode)
//     formData.append('ProductType', prod.ProductTypeID.toString())
//     formData.append('Image',prod.Image );
//    return this.http.post(endpoint, formData, httpOptions);
//   }






}
