import { Component, OnInit } from '@angular/core';
import { BrowseProperty } from '../browse-property';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import {ApiService} from '../api.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-browseproperties',
  templateUrl: './browseproperties.component.html',
  styleUrls: ['./browseproperties.component.css']
})
export class BrowsepropertiesComponent implements OnInit {
  dataSaved = false;  
  searchForm: any; 
  // updateEmployeeTypeForm: any; 
  // updateEmployeeType:any;
  allProperty:any;  
  product:BrowseProperty[];
  propertyUpdate = null;  
  message = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  searchedKeyword: string;

  searchText : string
  SearchBy : any ;
  isLoggedIn = false;
  notLoggedIn = true;
  nodata= false;
  names:any;
  hasApplied:boolean;
  isNotNumber:boolean;
  Property: any;
  constructor(private formbuilderUpdate:FormBuilder,private ApiService:ApiService,private route:Router) { }

  ngOnInit(): void {
   
    //Boolean(JSON.parse("false"));
    this.hasApplied=Boolean(JSON.parse(sessionStorage.getItem('hasApplied')));

    if(sessionStorage.getItem('loggedInStatus')=='true')
    { this.names=sessionStorage.getItem('username');
      this.isLoggedIn=false;

    }
    else{

      this.isLoggedIn=true;
    }

    this.searchForm = this.formbuilderUpdate.group({  
  
  
      SearchBy: ['', [Validators.required]], 
      searchText: ['', [Validators.required]],   
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onFormSubmit()
  
  {   this.allProperty="";
    this.nodata = false;
    this.isNotNumber = false;
    const search =this.searchForm.value;
  
    if(search.SearchBy=="Province")
  {
    await this.ApiService.getPropertyByProvince(search.searchText).subscribe(data => {
      //this.allProperty = data;
      console.log(data);
      console.log(JSON.stringify(data));
      debugger;
     
      this.getdata(data);
      
    });
    
  }
  else if(search.SearchBy=="Area")
  {
    await this.ApiService.getPropertyByArea(search.searchText).toPromise().then(data => {
      //this.allProperty = data;
      console.log(data);
      this.getdata(data);
    });

  }
  else if(search.SearchBy=="City")
  {
    await this.ApiService.getPropertyByCity(search.searchText).toPromise().then(data => {
      //this.allProperty = data;
      this.getdata(data);
    });

  }
  else if(search.SearchBy=="Reference")
  {

    if(isNaN(search.searchText)==false)
    {
      await this.ApiService.getPropertyByReference(search.searchText).toPromise().then(data => {
        console.log(data);
        //this.allProperty = data;
        console.log(JSON.stringify(data));
        this.getReferencedata(data);
      });

    }
    else{
this.isNotNumber=true;

    }
  

  }}
  
  logout(){

    sessionStorage.clear();
    this.ngOnInit()
  }

  

  viewProperty(PropertyID:any)
  { debugger;
    this.ApiService.PropertyID=PropertyID;
    this.route.navigateByUrl('/PropertyDetails');

  }

  getReferencedata(datas){
    debugger;
    if(datas.isValid=="false")
    { 
    
       this.nodata = true;
    
    }
    
    else if(datas!=null)
    {
       this.Property = datas;
     
      
    }

  }


  getdata(datas){
 debugger;
if(datas[0].isValid=="false")
{ 

   this.nodata = true;

}

else if(datas!=null)
{
   this.allProperty = datas;
 
  
}

  }
  
}
