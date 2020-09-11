import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { EmployeeType } from 'src/classes/employee-type';
import { City } from 'src/classes/city';
import { Area } from 'src/classes/area';
import { Province } from 'src/classes/province';
import { Router } from '@angular/router';


const httpOptions ={
  headers:new HttpHeaders({"Access-Control-Allow-Origin":'*'})

}
 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ApiUrl='http://localhost:30135/';  
  PropertyID:number=0;
  hasApplied:boolean;
  constructor(private router: Router,private http: HttpClient) { }


  logged(){
    if (sessionStorage.getItem('EmployeeID') == null) {
      this.router.navigate(['']);
    }
    
  }
  getAllEmployeeType(): Observable<EmployeeType[]> {  
    return this.http.get<EmployeeType[]>(this.ApiUrl + 'api/Employee/GetEmployeeTypes');  
  }  


getEmployeeTypeById(EmployeeTypeID: string): Observable<EmployeeType> {  
  return this.http.get<EmployeeType>(this.ApiUrl + 'api/Employee/GetEmployeeTypeDetailsById/' + EmployeeTypeID);  
}  


createEmployeeType(EmployeeType: EmployeeType): Observable<EmployeeType> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<EmployeeType>(this.ApiUrl + 'api/Employee/InsertEmployeeTypeDetails/',  
  EmployeeType, httpOptions);  
}  


updateEmployeeType(EmployeeType: EmployeeType): Observable<EmployeeType> {  
  debugger;
                   
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.put<EmployeeType>(this.ApiUrl + 'api/Employee/UpdateEmployeeTypeDetails/',  
  EmployeeType, httpOptions);  
}  



deleteEmployeeTypeById(EmployeeTypeID: string): Observable<number> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.delete<number>(this.ApiUrl + 'api/Employee/DeleteEmployeeTypeDetails?id=' +EmployeeTypeID,  
httpOptions);  
}  

//City||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
getAllCity(): Observable<City[]> {  
  return this.http.get<City[]>(this.ApiUrl + 'api/Location/GetCities');  
}  


getCityById(CityID: string): Observable<City> {  
return this.http.get<City>(this.ApiUrl + 'api/Location/GetCityDetailsById/' + CityID);  
}  




createCity(City: City): Observable<City> {  
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
return this.http.post<City>(this.ApiUrl + 'api/Location/InsertCityDetails/',  
City, httpOptions);  
}  


updateCity(City: City): Observable<City> {  
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
return this.http.put<City>(this.ApiUrl + 'api/Location/UpdateCityDetails/',  
City, httpOptions);  
}  



deleteCityById(CityID: string): Observable<number> {  
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
return this.http.delete<number>(this.ApiUrl + 'api/Location/DeleteCityDetails?id=' +CityID,  
httpOptions);  
}  

//Area||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
getAllArea(): Observable<Area[]> {  
  return this.http.get<Area[]>(this.ApiUrl + 'api/Location/GetAreas');  
}  


getAreaById(AreaID: string): Observable<Area> {  
return this.http.get<Area>(this.ApiUrl + 'api/Location/GetAreaDetailsById/' + AreaID);  
}  


createArea(Area: Area): Observable<Area> {  
  debugger;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
return this.http.post<Area>(this.ApiUrl + 'api/Location/InsertAreaDetails/',  
Area, httpOptions);  
}  


updateArea(Area: Area): Observable<Area> {  
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
return this.http.put<Area>(this.ApiUrl + 'api/Location/UpdateAreaDetails/',  
Area, httpOptions);  
}  



deleteAreaById(AreaID: string): Observable<number> {  
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
return this.http.delete<number>(this.ApiUrl + 'api/Location/DeleteAreaDetails?id=' +AreaID,  
httpOptions);  
}  


// //Province||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
getAllProvince(): Observable<Province[]> {  
  return this.http.get<Province[]>(this.ApiUrl + 'api/Location/GetProvinces');  
}  


getProvinceById(ProvinceID: string): Observable<Province> {  
return this.http.get<Province>(this.ApiUrl + 'api/Location/GetProvinceDetailsById/' + ProvinceID);  
}  


createProvince(Province: Province): Observable<Province> {  
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
return this.http.post<Province>(this.ApiUrl + 'api/Location/InsertProvinceDetails/',  
Province, httpOptions);  
}  


updateProvince(Province: Province): Observable<Province> {  
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
return this.http.put<Province>(this.ApiUrl + 'api/Location/UpdateProvinceDetails/',  
Province, httpOptions);  
}  



deleteProvinceById(ProvinceID: string): Observable<number> {  
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
return this.http.delete<number>(this.ApiUrl + 'api/Location/DeleteProvinceDetails?id=' +ProvinceID,  
httpOptions);  
}  


//Browse property page|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

getPropertyByProvince(Province : string){

  return this.http.get(this.ApiUrl+'api/Rental/getPropertyByProvince/'+Province);

}

getPropertyByArea(Area : string){

  return this.http.get(this.ApiUrl+'api/Rental/getPropertyByArea/'+Area);

}

getPropertyByReference(Reference : string){

  return this.http.get(this.ApiUrl+'api/Rental/getPropertyByReference/'+Reference);

}

getPropertyByCity(City : string){

  return this.http.get(this.ApiUrl+'api/Rental/getPropertyByCity/'+City);

}


}












