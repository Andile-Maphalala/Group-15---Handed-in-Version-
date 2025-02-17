import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {DueDate} from 'src/classes/Payment';
import { AdminService } from 'src/app/admin.service';


@Component({
  selector: 'app-extend-due-date',
  templateUrl: './extend-due-date.component.html',
  styleUrls: ['./extend-due-date.component.css']
})
export class ExtendDueDateComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  dueForm: any;
  duesForm: any; 
  alldues: Observable<DueDate[]>;  
  loadfiltereddues: Observable<DueDate[]>;  
  dueIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
 
 

 
  constructor(private formbulider: FormBuilder,private adminService:AdminService) { }  
  ngOnInit(): void {  
    this.dueForm = this.formbulider.group({ 
      
       RENTALAGREEMENTID:['', [Validators.required]], 
       DepositDueDate:['', [Validators.required]],  
      // RENTALSTATUSID:['', [Validators.required]],  
      // CLIENTID: ['', [Validators.required]],  
      // RENTALAPPLICATIONID:['', [Validators.required]],  
      // PROPERTYID:['', [Validators.required]],  
      // RENTALSTARTDATE:['', [Validators.required]],  
      // RENTALENDDATE:['',[Validators.required]],
      // PAYMENTID:['', [Validators.required]], 
      // NAME:['', [Validators.required]],  
      // SURNAME:['',[Validators.required]],
      // PHONENUMBER:['', [Validators.required]], 
      
  
   
    })  
    this.loadAlldues();  
    this.dueForm = this.formbulider.group({  
       RENTALAGREEMENTID:['', [Validators.required]], 
       DepositDueDate:['', [Validators.required]],  
      // RENTALSTATUSID:['', [Validators.required]],  
      // CLIENTID: ['', [Validators.required]],  
      // RENTALAPPLICATIONID:['', [Validators.required]],  
      // PROPERTYID:['', [Validators.required]],  
      // RENTALSTARTDATE:['', [Validators.required]],  
      // RENTALENDDATE:['',[Validators.required]],
      // PAYMENTID:['', [Validators.required]], 
      // NAME:['', [Validators.required]],  
      // SURNAME:['',[Validators.required]],
      // PHONENUMBER:['', [Validators.required]], 
     
        }) 

  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadAlldues() {  
    this.alldues = this.adminService.GetDuedate();  
  }  

  onFormSubmit() {  
    this.dataSaved = false;  
    const Employee = this.dueForm.value;  
    this.Updateduedate(Employee);  
    this.dueForm.reset();  
    
  }  


  

      
  loaddueToEdit(RentalagreementID: string) {  
    this.adminService.getdueById(RentalagreementID).subscribe(dues=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.dueIdUpdate = null;  
      this.dueIdUpdate = dues.RENTALAGREEMENTID;  
      this.dueForm.controls['RENTALAGREEMENTID'].setValue(dues.RENTALAGREEMENTID); 
      this.dueForm.controls['DepositDueDate'].setValue(dues.DepositDueDate); 
      this.dueForm.controls['RENTALSTATUSID'].setValue(dues.RENTALSTATUSID); 
      this.dueForm.controls['CLIENTID'].setValue(dues.CLIENTID); 
      this.dueForm.controls['RENTALAPPLICATIONID'].setValue(dues.RENTALAPPLICATIONID); 
      this.dueForm.controls['PROPERTYID'].setValue(dues.PROPERTYID);  
      this.dueForm.controls['RENTALSTARTDATE'].setValue(dues.RENTALSTARTDATE);  
      this.dueForm.controls['RENTALENDDATE'].setValue(dues.RENTALENDDATE);  
      this.dueForm.controls['PAYMENTID'].setValue(dues.PAYMENTID); 
     
    
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
     
Updateduedate(dues: DueDate){  debugger;
          this.adminService.updatedue(dues).subscribe(() => {
            this.closebutton.nativeElement.click();   
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.dueIdUpdate = null;  
            this.dueForm.reset(); }
          );
      
        }
    
    
  
  
 

  resetForm() {  
     this.dueForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
