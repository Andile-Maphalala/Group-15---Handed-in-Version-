import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TerminatedAgree } from '../terminated-agree';
import { FormBuilder, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { TerminateRService } from '../terminate-r.service';

@Component({
  selector: 'app-request-to-terminate-rental-agreement',
  templateUrl: './request-to-terminate-rental-agreement.component.html',
  styleUrls: ['./request-to-terminate-rental-agreement.component.css']
})
export class RequestToTerminateRentalAgreementComponent implements OnInit {

  dataSaved = false;  
  terminatedForm: any;  
  allTerminated: Observable<TerminatedAgree[]>;  
  terminatedIdUpdate = null;  
  massage = null;  
  url="http://formspree.io/nhlanhlakhosa69@gmail.com";
  
  constructor(private formbulider: FormBuilder, private terminatedService:TerminateRService) { }  
  
  ngOnInit() {  
  //   this.terminatedForm = this.formbulider.group({  
  //     DATETIME: ['', [Validators.required]],  
  //     REASON: ['', [Validators.required]],  
      
        
  //   });  
  //   this.loadAllTerminated();  
  // }  
  // loadAllTerminated() {  
  //   this.allTerminated = this.terminatedService.getAllTerminated();  
  // }  
  // onFormSubmit() {  
  //   this.dataSaved = false;  
  //   const terminated = this.terminatedForm.value;  
  //   this.CreateTerminated(terminated);  
  //   this.terminatedForm.reset();  
  // }  
  // loadEmployeeToEdit(terminatedId: string) {  
  //   this.terminatedService.getTerminatedById(terminatedId).subscribe(terminated=> {  
  //     this.massage = null;  
  //     this.dataSaved = false;  
  //     this.terminatedIdUpdate = terminated.TERMINATEDRENTALAGREEMENTID;  
  //     this.terminatedForm.controls['DATETIME'].setValue(terminated.DATETIME);  
  //    this.terminatedForm.controls['REASON'].setValue(terminated.REASON);    
        
  //   });  
  
  // }  
  // CreateTerminated(terminated: TerminatedAgree) {  
  //   if (this.terminatedIdUpdate == null) {  
  //     this.terminatedService.createTerminated(terminated).subscribe(  
  //       () => {  
  //         this.dataSaved = true;  
  //         this.massage = 'Record saved Successfully';  
  //         this.loadAllTerminated();  
  //         this.terminatedIdUpdate = null;  
  //         this.terminatedForm.reset();  
  //       }  
  //     );  
  //   } else {  
  //     terminated.TERMINATEDRENTALAGREEMENTID = this.terminatedIdUpdate;  
  //     this.terminatedService.createTerminated(terminated).subscribe(() => {  
  //       this.dataSaved = true;   
  //       this.loadAllTerminated();  
  //       this.terminatedIdUpdate = null;  
  //       this.terminatedForm.reset();  
  //     });  
  //   }  
  // }   
 

  // resetForm() {  
  //   this.terminatedForm.reset();  
  //   this.massage = null;  
  //   this.dataSaved = false;
    
    

  }
}
