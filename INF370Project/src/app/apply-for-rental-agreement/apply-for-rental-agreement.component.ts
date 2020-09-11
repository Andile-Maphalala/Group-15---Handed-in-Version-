import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../application';
import { FormBuilder, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { TerminateRService } from '../terminate-r.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
//import {NgbModal, ModalDismissReasons} 
///import { Date } from 'src/classes/Date';

@Component({
  selector: 'app-apply-for-rental-agreement',
  templateUrl: './apply-for-rental-agreement.component.html',
  styleUrls: ['./apply-for-rental-agreement.component.css'],
  providers: [DatePipe]
})

export class ApplyForRentalAgreementComponent implements OnInit {

  @ViewChild('modal') modal: any;
  dataSaved = false;
  applicationForm: any;
  allApplications: Observable<Application[]>;
  applicationIdUpdate = null;
  massage = null;
  @ViewChild('resumeInput', { static: false }) resumeInput;
  @ViewChild('logoInput', { static: false }) logoInput;
  @ViewChild('Bursary', { static: false }) Bursary;
  selectedFile: File = null;
  imageUrl: string;
  fileToUpload: File = null;
  saveFileForm: any;
  lstFileDetails: any;
  propertyID: number;
  APPLICATIONDATE=new Date() ;
  clientID: string;
  isStudent: boolean;
  minDate: Date = new Date; 
  showModalBox: boolean;
  
  
  constructor(private httpService: HttpClient ,private formbulider: FormBuilder, private applicationService:MyServiceService,private service:TerminateRService,private router:Router) { }
  
  CLIENTs: string[];
  ngOnInit() {
    this.propertyID=this.applicationService.PropertyID;
    //this.APPLICATIONDATE= Date.now().toString();
    this.minDate.toLocaleDateString();
    

    this.clientID=sessionStorage.getItem('clientID');
    this.httpService.get('http://localhost:30135/Api/Apply/Apply').subscribe(
      data => {
        

        this.getdata(data);
       this.CLIENTs = data as unknown as string[];
       console.log(data);
      }
    );
    this.saveFileForm = this.formbulider.group({
      PREFERREDDATE: ['', [Validators.required]],
      // PAYSLIP: ['', [Validators.required]],
      // BURSARYLETTER: ['', [Validators.required]]
    });
    this.applicationForm = this.formbulider.group({
      APPLICATIONDATE: ['', [Validators.required]],
      PROPERTYID: ['', [Validators.required]],
      CLIENTID: ['', [Validators.required]],
    });
    this.loadAllApplications();
  }
  loadAllApplications() {
    this.allApplications = this.applicationService.getAllApplication();
  }
  getdata(datas){
    
    if(datas[0].isStudent==false)
{

  this.isStudent=false;
}
else{
  this.isStudent=true;

}

  }


  onFormSubmit() {
    this.dataSaved = false;
    const application = this.applicationForm.value;
    this.CreateApplication(application);
    this.applicationForm.reset();
  }
  loadApplicationToEdit(applicationId: string) {
    this.applicationService.getApplicationById(applicationId).subscribe(application=> {
      this.massage = null;
      this.dataSaved = false;
      this.applicationIdUpdate = application.RENTALAPPLICATIONID;
      this.applicationForm.controls['APPLICATIONDATE'].setValue(application.APPLICATIONDATE);


    });

  }
  CreateApplication(application: Application) {
    if (this.applicationIdUpdate == null) {
      this.applicationService.createApplication(application).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadAllApplications();
          this.applicationIdUpdate = null;
          this.applicationForm.reset();
        }
      );
    } else {
      application.RENTALAPPLICATIONID = this.applicationIdUpdate;
      this.applicationService.updateApplication(application).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllApplications();
        this.applicationIdUpdate = null;
        this.applicationForm.reset();
      });
    }
  }

  resetForm() {
    this.applicationForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }
  onExpSubmit() {

    debugger;
    // if (this.saveFileForm.invalid) {
    //   return;
    // }


    let formData = new FormData();
    if(this.resumeInput.nativeElement.files[0]==null){
 
    }
    else{
      formData.append('IDENTITYDOCUMENT', this.resumeInput.nativeElement.files[0]);
    }

    if(this.logoInput.nativeElement.files[0]==null){
      

    }
    else{
      formData.append('PAYSLIP', this.logoInput.nativeElement.files[0]);
    }
    if(this.Bursary.nativeElement.files[0]==null){ debugger;
      
    }
      else{
        formData.append('BURSARYLETTER', this.Bursary.nativeElement.files[0]); 
       
      }


    
    if(this.clientID){ 
      formData.append('CLIENTID', this.clientID);
    }
    if(this.propertyID.toString()){
      formData.append('PROPERTYID',this.propertyID.toString() );
    }
    
    formData.append('PREFERREDDATE',this.saveFileForm.value.PREFERREDDATE.toUTCString( ));
    ;
    
    
    
   
debugger;

//this.modal.show();
    this.service.AddFileDetails(formData).subscribe(result => {
   

    this.router.navigateByUrl('/');
    });

  }


  public open() {

       // Open the modal
       this.showModalBox = true;
  

  }
  
}

