import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {PropertyService} from 'src/app/Services/property.service';
import{Property} from 'src/app/models/property';

@Component({
  selector: 'app-add-property',
  templateUrl: 'add-property.component.html',
  styleUrls: ['add-property.component.css']
  ,providers:[PropertyService]
})

export class AddPropertyComponent implements OnInit {  
  dataSaved = false;  
  propertyForm: any;  
  allemployees: Observable<Property[]>;  
  employeeIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  updatePropertyForm: any; 
  updateProperty:any;
  product:Property[];

  
  
  
  constructor(private formbulider: FormBuilder,private propertyService:PropertyService) { }  
  ngOnInit(): void {  
    this.updatePropertyForm = this.formbulider.group({  
      PROPERTYID:['', [Validators.required]], 
      PROPERTYSTATUSID:['', [Validators.required]], 
      PROPERTYTYPEID:['', [Validators.required]], 
      AGENT_ID:['', [Validators.required]], 
      AREAID:['', [Validators.required]], 
      PROPERTYDESCRIPTION:['', [Validators.required]],  
      ADDRESS:['', [Validators.required]],  
      SIZE: ['', [Validators.required]],  
      NUMBED:['', [Validators.required]],  
      NUMBBATH:['', [Validators.required]],  
      GARDEN:['', [Validators.required]],  
      ADDITIONALINFO:['', [Validators.required]],  
      LISTINGDATE:['', [Validators.required]],  
    })  
    this.propertyForm= this.formbulider.group({  
      PROPERTYID:['', [Validators.required]],  
      PROPERTYSTATUSID:['', [Validators.required]], 
      PROPERTYTYPEID:['', [Validators.required]], 
      AGENT_ID:['', [Validators.required]], 
      AREAID:['', [Validators.required]], 
      PROPERTYDESCRIPTION:['', [Validators.required]],  
      ADDRESS: ['', [Validators.required]],  
      SIZE: ['', [Validators.required]],  
      NUMBED:['', [Validators.required]],  
      NUMBBATH:['', [Validators.required]],  
      GARDEN:['', [Validators.required]],  
      ADDITIONALINFO:['', [Validators.required]],  
      LISTINGDATE:['', [Validators.required]],
        }) 
    this.loadAllemployees();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadAllemployees() {  
    this.allemployees = this.propertyService.getAllProperty();  
  }  

    
  
   onFormSubmit() {  
     this.dataSaved = false;  
     const employees = this.propertyForm.value;  
     this.Createemployee(employees);  
     this.propertyForm.reset();  
   }  
   onFormSubmitUpdateProperty() {  
        this.dataSaved = false;  
        const Employee = this.updatePropertyForm.value;  
        this.UpdateEmployee(Employee);  
        this.updatePropertyForm.reset();  
        
      }  
  

      
  loademployeeToEdit(employeeId: string) {  
    this.propertyService.getPropertyById(employeeId).subscribe(employees=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.employeeIdUpdate = employees.PROPERTYID;  
      this.updatePropertyForm.controls['PROPERTYID'].setValue(employees.PROPERTYID); 
      this.updatePropertyForm.controls['PROPERTYDESCRITION'].setValue(employees.PROPERTYDESCRIPTION); 
      this.updatePropertyForm.controls['ADDRESS'].setValue(employees.ADDRESS);
      this.updatePropertyForm.controls['SIZE'].setValue(employees.SIZE); 
      this.updatePropertyForm.controls['NUMBED'].setValue(employees.NUMBED); 
      this.updatePropertyForm.controls['NUMBATH'].setValue(employees.NUMBBATH); 
      this.updatePropertyForm.controls['ADDITIONALINFO'].setValue(employees.ADDITIONALINFO);  
      this.updatePropertyForm.controls['LISTINGDATE'].setValue(employees.LISTINGDATE);  
      
          
    }); 
  }
      public Addopen() {
    if(0){
      // Dont open the modal
      this.AddshowModalBox = false;
    } else {
       // Open the modal
       this.AddshowModalBox = true;
    }

  }

 
  public open() {
    if(0){
      // Dont open the modal
      this.showModalBox = false;
    } else {
       // Open the modal
       this.showModalBox = true;
    }
  }
UpdateEmployee(employees: Property){
      debugger;
          this.propertyService.updateProperty(employees).subscribe(() => {  
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.loadAllemployees();  
            this.employeeIdUpdate = null;  
            this.updatePropertyForm.reset(); }
          );
      
        }
  
  
  
   Createemployee(employees: Property) {  
     if (this.employeeIdUpdate == null) {  debugger;
       this.propertyService.createProperty(employees).subscribe(  
         () => {  
           this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
           this.loadAllemployees();  
           this.employeeIdUpdate = null;  
           this.propertyForm.reset();  
         }  
       );  
     } 
  }   
  
  deleteemployee(employeeId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.propertyService.deletePropertyById(employeeId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllemployees();  
      this.employeeIdUpdate = null;  
      this.propertyForm.reset();  
  
    });  
  }  
  }  
  resetForm() {  
     this.propertyForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}