import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Agreements} from 'src/classes/RentalAgreement';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-terminate-agreement',
  templateUrl: './terminate-agreement.component.html',
  styleUrls: ['./terminate-agreement.component.css']
})
export class TerminateAgreementComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
    dataSaved = false;  
    clientForm: any;
    clients: Observable<Agreements[]>;  
    loadfilteredcln: Observable<Agreements[]>;  
    dueIdUpdate = null;  
    massage = null;  
    showModalBox: boolean = false;
    AddshowModalBox: boolean = false;
   
   
  
   
    constructor(private formbulider: FormBuilder,private adminService:AdminService) { }  
    ngOnInit(): void {  
      this.clientForm = this.formbulider.group({ 
        
        RENTALAGREEMENTID:['', [Validators.required]], 
     
        
    
     
      })  
      this.loadClient();  
      this.clientForm = this.formbulider.group({  
        RENTALAGREEMENTID:['', [Validators.required]], 
     
          }) 
          this.loadClient();  
  
    }  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
   
   }
    loadClient() {  
      this.clients = this.adminService.Getagreement();  
    }  
  
    onFormSubmit() {  
      this.dataSaved = false;  
      const Employee = this.clientForm.value;  
      this.clientForm.reset();  
      
    }  
    onFormSubmitUpdateAgreement() {  
      this.dataSaved = false;  
      const Agreement = this.clientForm.value;  
      this.UpdateClient(Agreement);  
      this.clientForm.reset();  
      
    }  
  
    
  
        
    loaddueToEdit(RentalagreementID: string) {  
      this.adminService.getdueById(RentalagreementID).subscribe(agree=> {  
        
        this.massage = null;  
        this.dataSaved = false;  
        this.dueIdUpdate = null;
        this.dueIdUpdate = agree.RENTALAGREEMENTID;  
        this.clientForm.controls['RENTALAGREEMENTID'].setValue(agree.RENTALAGREEMENTID); 
    
      
      }); 
    }
    UpdateClient(Agreement: Agreements){
      debugger;
          this.adminService.updateAgreement(Agreement).subscribe(() => {  
            this.closebutton.nativeElement.click();   
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.loadClient();  
            this.dueIdUpdate = null;  
            this.clientForm.reset(); }
          );
      
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
       
  Updateduedate(Agreement: Agreements){  debugger;
            this.adminService.updatedue(Agreement).subscribe(() => {  
              this.closebutton.nativeElement.click();   
              this.dataSaved = true;  
              this.massage = 'Record Updated Successfully';  
              this.dueIdUpdate = null;  
              this.clientForm.reset(); }
            );
        
          }

         
        
           
    
    
   
  
    resetForm() {  
       this.clientForm.reset();  
       this.massage = null;  
       this.dataSaved = false;  
       }  
       
  }
  