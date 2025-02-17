import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import {Agreements} from 'src/classes/RentalAgreement';
import {DueDate} from 'src/classes/Payment';
import { Job } from 'src/classes/Jobs';  
import {Application} from 'src/classes/Application';
//import {Agreements } from '../Classes/RentalAgreement';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = 'http://localhost:30135/';  
  constructor(private http: HttpClient) { }  
  GetRequestedExtensions(): Observable<[]> {  
    return this.http.get<[]>(this.url + 'api/Admin/GetExtensionRequest');  
  }  
  updateAgreements(agree: Agreements): Observable<Agreements> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Agreements>(this.url + 'api/Admin/AcceptExtensionRequestDetails/',  
    agree, httpOptions); 
     }
     updateextend(agree: Agreements): Observable<Agreements> {  debugger;
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
      return this.http.put<Agreements>(this.url + 'api/Admin/UpdateappDetails/',  
      agree, httpOptions); 
       }
       RejTermination(agree: Agreements): Observable<Agreements> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Agreements>(this.url + 'api/Admin/UpdateRentalAgreement/',  
    agree, httpOptions); 
     }
  GetRequestedTerminations(): Observable<[]> {  
    return this.http.get<[]>(this.url + 'api/Admin/GetTerminationRequest');  
  }  
  Getpay(): Observable<[]> {  
    return this.http.get<[]>(this.url + 'api/Admin/Getpayment');  
  }  
  getagreementById(RentalagreementID: string): Observable<Agreements> {  
    return this.http.get<Agreements>(this.url + 'api/Admin/GetAgreementDetailsById/' + RentalagreementID);  
  }  
  GetDuedate(): Observable<[]> {  
    return this.http.get<[]>(this.url + 'api/Admin/GetDuedate');  
  }  
  getdueById(RentalagreementID: string): Observable<DueDate> {  
    return this.http.get<DueDate>(this.url + 'api/Admin/GetduedateById/' + RentalagreementID);  
  }  
  updatedue(dues: DueDate): Observable<DueDate> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<DueDate>(this.url + 'api/Admin/ExtendduedateDetails/',  
      dues, httpOptions); 
     }
     updateAppAccepted(apps: Application): Observable<Application> {  debugger;
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
      return this.http.put<Application>(this.url + 'api/Admin/UpdateAppAccepted/',  
        apps, httpOptions); 
       }
       updateAppRej(apps: Application): Observable<Application> {  debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.put<Application>(this.url + 'api/Admin/UpdateAppRejected/',  
          apps, httpOptions); 
         }
GetClient(): Observable<[]> {  
      return this.http.get<[]>(this.url + 'api/Admin/Getleaseexpiryreminder');  
    }
GETClient(): Observable<[]> {  
      return this.http.get<[]>(this.url + 'api/Admin/Getpaymetreminder');  
    }
    Getagreement(): Observable<[]> {  
      return this.http.get<[]>(this.url + 'api/Admin/Getagreement');  
    }
    GetAssignedJobs(): Observable<[]> {  
      return this.http.get<[]>(this.url + 'api/Admin/GetUnassignedJobs');  
    }  
    getJobById(jobID: string): Observable<Job> {  
      return this.http.get<Job>(this.url + 'api/Admin/GetJobDetailsById/' + jobID);  
    }  
    createJob(employee: Job): Observable<Job> {  
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
      return this.http.post<Job>(this.url + 'api/Admin/InsertJobDetails/',  
      employee, httpOptions);  
    }  
    updateJob(employee: Job): Observable<Job> {  debugger;
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
      return this.http.put<Job>(this.url + 'api/Admin/UpdateJobDetails/',  
      employee, httpOptions);  
    }  
    deleteJobById(employeeId: string): Observable<number> {  
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
      return this.http.delete<number>(this.url + 'api/Job/DeleteJobDetails?id=' +employeeId,  
   httpOptions);  
    } 
    getAllEmployee(): Observable<[]> {  
      return this.http.get<[]>(this.url + 'api/Employee/GetAllEmployees');  
    }  
    GetApplications(): Observable<[]> {  
      return this.http.get<[]>(this.url + 'api/Admin/GetApplication');  
    }
    getapplicationtById(DocumentID: string): Observable<Application> {  
      return this.http.get<Application>(this.url + 'api/Admin/GetApplicationById/' + DocumentID);  
    }  
    getrejapplicationtById(DocumentID: string): Observable<Application> {  
      return this.http.get<Application>(this.url + 'api/Admin/GetrejApplicationById/' + DocumentID);  
    }  
    public downloadFile(IDENTITYDOCUMENT: string): Observable<Blob> {
      return this.http.get(this.url + 'api/Admin//GetFile?IDENTITYDOCUMENT=' + IDENTITYDOCUMENT, { responseType: 'blob' });
  
    }
    public downloadImage(image: string): Observable<Blob> {
      return this.http.get(this.url + '/GetImage?image=' + image, { responseType: 'blob' });
  
    }
  
    public getFiles(): Observable<any[]> {
      return this.http.get<any[]>(this.url + 'api/Admin//GetFileDetails');
  
    }
  
    AddFileDetails(data: FormData): Observable<string> {
  
      let headers = new HttpHeaders();
  
      headers.append('Content-Type', 'application/json');
      const httpOptions = { headers: headers };
  
      return this.http.post<string>(this.url + 'api/Admin//AddFileDetails/',
        data, httpOptions);
    }
    updateAgreement(Agreement: Agreements): Observable<Agreements> {  debugger;
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
      return this.http.put<Agreements>(this.url + 'api/Admin/UpdateRentalAgreementDetails/',  
      Agreement, httpOptions);  
    }  
}  
