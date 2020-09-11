import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable, from } from 'rxjs';  
import {Inspection} from "src/app/models/inspection";
@Injectable({
  providedIn: 'root'
})

export class InspectionService {
  url = 'http://localhost:30135/'; 
  constructor(private http: HttpClient) { }  
  getAllInspection(): Observable<Inspection[]> {  
    return this.http.get<Inspection[]>(this.url + 'api/MoveIn/GetInspections');  
  }  
  getInspectionById(inspectionId: string): Observable<Inspection> {  
    return this.http.get<Inspection>(this.url + 'api/MoveIn/GetInspectionsDetailsById/' + inspectionId);  
  }  
  createProperty(inspection: Inspection): Observable<Inspection> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Inspection>(this.url + 'api/MoveIn"/InsertInspectionsDetails/',  
    inspection, httpOptions);  
  }  
  updateInspection(inspection: Inspection): Observable<Inspection> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Inspection>(this.url + 'api/MoveIn/UpdateInspectionDetails/', 
    inspection, httpOptions);  
  }  
  deleteInspectionById(inspectionid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + 'api/MoveIn/DeleteInspectionDetails?id=' +inspectionid,  
 httpOptions);  
  }

  
}
