import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs'; 
import {Agreements} from 'src/classes/RentalAgreement';
import { AdminService } from 'src/app/admin.service';
import { Pay } from 'src/classes/Payments';

//import { Pay } from '../../../Classes/Payments';
@Component({
  selector: 'app-view-termination-request',
  templateUrl: './view-termination-request.component.html',
  styleUrls: ['./view-termination-request.component.css']
})
export class ViewTerminationRequestComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  agreementsForm: any;
  PayForm: any; 
  allagreements: Observable<Agreements[]>;  
  allpay: Observable<Pay[]>;  
  agreementsIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
 

 
  constructor(private formbulider: FormBuilder,private adminService:AdminService) { }  
  ngOnInit(): void {  
    this.agreementsForm = this.formbulider.group({ 
      
      RENTALAGREEMENTID:['', [Validators.required]], 
      // RENTALSTATUSID:['', [Validators.required]], 
      // USERID:['', [Validators.required]], 
      // CLIENTID:['', [Validators.required]], 
      // RENTALAPPLICATIONID:['', [Validators.required]], 
      // PROPERTYID:['', [Validators.required]], 
      // RENTALSTARTDATE:['', [Validators.required]], 
      // RENTALENDDATE:['', [Validators.required]], 
      // NAME:['', [Validators.required]], 
      // SURNAME:['', [Validators.required]], 
      // EMAIL:['', [Validators.required]], 
      // ADDRESS:['', [Validators.required]], 
      // USERNAME:['', [Validators.required]], 
  
   
    })  
    this.loadagreements();  
    this.PayForm = this.formbulider.group({  
      PAYMENTID:['', [Validators.required]], 
      RENTALAGREEMENTID:['', [Validators.required]], 
      PAYMENT_REFERENCE_NO:['', [Validators.required]], 
      PAYMENT_AMOUNT:['', [Validators.required]], 
      PAYMENTDATETIME:['', [Validators.required]], 
    
  
        }) 
        this.Loadpayments();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadagreements() {  
    this.allagreements = this.adminService.GetRequestedTerminations();  
  }  
  Loadpayments() {  
    this.allpay = this.adminService.Getpay();  
  }  
    
  
   onFormSubmit() {  
     this.dataSaved = false;  
     const agreements = this.agreementsForm.value;  
     this.UpdateClient(agreements);  
     this.agreementsForm.reset();  
   }  
   onFormPaySubmit() {  
    this.dataSaved = false;  
    const agreements = this.agreementsForm.value;  
    this.RejTermination(agreements);  
    this.agreementsForm.reset();  
  }  
  //  onFormSubmitUpdateAgreements() {  
  //   this.dataSaved = false;  
  //   const Agreements = this.agreementsForm.value;  
  //   this.UpdateAgreements(Agreements);  
  //   this.agreementsForm.reset();  
    
  // }  

  

      
  loadagreementToEdit(RentalagreementID: string) {  
    this.adminService.getagreementById(RentalagreementID).subscribe(agreements=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.agreementsIdUpdate = null;  
      this.agreementsIdUpdate = agreements.RENTALAGREEMENTID;  
      this.agreementsForm.controls['RENTALAGREEMENTID'].setValue(agreements.RENTALAGREEMENTID); 
      this.agreementsForm.controls['RENTALSTATUSID'].setValue(agreements.RENTALSTATUSID); 
      this.agreementsForm.controls['USERID'].setValue(agreements.USERID); 
      this.agreementsForm.controls['CLIENTID'].setValue(agreements.CLIENTID); 
      this.agreementsForm.controls['RENTALAPPLICATIONID'].setValue(agreements.RENTALAPPLICATIONID); 
      this.agreementsForm.controls['PROPERTYID'].setValue(agreements.PROPERTYID);  
      this.agreementsForm.controls['RENTALSTARTDATE'].setValue(agreements.RENTALSTARTDATE);  
      this.agreementsForm.controls['RENTALENDDATE'].setValue(agreements.RENTALENDDATE);  
      this.agreementsForm.controls['NAME'].setValue(agreements.NAME); 
      this.agreementsForm.controls['SURNAME'].setValue(agreements.SURNAME);  
      this.agreementsForm.controls['EMAIL'].setValue(agreements.EMAIL);  
      this.agreementsForm.controls['ADDRESS'].setValue(agreements.ADDRESS);  
      this.agreementsForm.controls['USERNAME'].setValue(agreements.USERNAME);     
    }); 
  }
  UpdateClient(Agreement: Agreements){
    debugger;
        this.adminService.updateAgreement(Agreement).subscribe(() => {  
          this.dataSaved = true;  
          this.closebutton.nativeElement.click();   
          this.massage = 'Record Updated Successfully';  
          this.loadagreements();  
          this.agreementsIdUpdate = null;  
          this.agreementsForm.reset(); }
        );
    
      }
      RejTermination(Agreement: Agreements){
        debugger;
            this.adminService.RejTermination(Agreement).subscribe(() => {  
              this.closebutton.nativeElement.click();   
              this.dataSaved = true;  
              this.massage = 'Record Updated Successfully';  
              this.loadagreements();  
              this.agreementsIdUpdate = null;  
              this.agreementsForm.reset(); }
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
  //  Createjob(agreements: Agreements) {  
  //    if (this.agreementsIdUpdate == null) {  debugger;
  //      this.adminService.createAgreements(agreements).subscribe(  
  //        () => {  
  //          this.dataSaved = true;  
  //         this.massage = 'Record saved Successfully';  
  //          this.loadallagreements();  
  //          this.agreementsIdUpdate = null;  
  //          this.agreementsForm.reset();  
  //        }  
  //      );  
  //    } 
  // }   
  
  // deletejob(jobId: string) {  
  //   if (confirm("Are you sure you want to delete this ?")) {   
  //   this.adminService.deleteAgreementsById(jobId).subscribe(() => {  
  //     this.dataSaved = true;  
  //     this.massage = 'Record Deleted Succefully';  
  //     this.loadallagreements();  
  //     this.agreementsIdUpdate = null;  
  //     this.agreementsForm.reset();  
  
  //   });  
  // }  
 // }  
  resetForm() {  
     this.agreementsForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
