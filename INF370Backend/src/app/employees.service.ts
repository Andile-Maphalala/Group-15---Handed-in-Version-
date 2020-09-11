
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Employee } from 'src/classes/Employee';  

@Injectable({  
  providedIn: 'root'  
})  
  
export class EmployeeService {  
  url = 'http://localhost:30135/';  
  constructor(private http: HttpClient) { }  
  getAllEmployee(): Observable<[]> {  
    return this.http.get<[]>(this.url + 'api/Employee/GetAllEmployees');  
  }  
  getEmployeeById(employeeId: string): Observable<Employee> {  
    return this.http.get<Employee>(this.url + 'api/Employee/GetEmployeeDetailsById/' + employeeId);  
  }  
  createEmployee(employee: Employee): Observable<Employee> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Employee>(this.url + 'api/Employee/InsertEmployeeDetails/',  
    employee, httpOptions);  
  }  
  updateEmployee(employee: Employee): Observable<Employee> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Employee>(this.url + 'api/Employee/UpdateEmployeeDetails/',  
    employee, httpOptions);  
  }  
  deleteEmployeeById(employeeId: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + 'api/Employee/DeleteEmployeeDetails?id=' +employeeId,  
 httpOptions);  
  }  
//   UserAuthentication(Username: string,Password: string):Observable<any>{    
//     let credentials='username=' +Username  + '&password=' +Password +'&grant_type=password';     
//     var reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });    
//    return this.http.post<any>(this.url+'token',encodeURI(credentials),{headers:reqHeader});    
//  }    
}  
