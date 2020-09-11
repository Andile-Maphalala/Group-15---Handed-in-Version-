import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 

import { AdminService } from 'src/app/admin.service';
import { saveAs as importedSaveAs } from "file-saver";
import {  ViewChild } from '@angular/core';
import { Application } from 'src/classes/Application';


@Component({
  selector: 'app-review-application',
  templateUrl: './review-application.component.html',
  styleUrls: ['./review-application.component.css']
})
export class ReviewApplicationComponent implements OnInit {
  url="https://formspree.io/russmj912@gmail.com"
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  appForm: any;
  appsForm: any; 
  rejForm: any; 
  allapps: Observable<Application[]>;  
  loadfiltedapp: Observable<Application[]>;  
  appsIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  @ViewChild('resumeInput', { static: true }) resumeInput;
  @ViewChild('logoInput', { static: true }) logoInput;
  selectedFile: File = null;
  imageUrl: string;
  fileToUpload: File = null;
  saveFileForm: any;
  lstFileDetails: any;
 
 
 

 
  constructor(private formbulider: FormBuilder,private adminService:AdminService) { }  
  ngOnInit(): void {  
    this.appForm = this.formbulider.group({ 
      
      RENTALAPPLICATIONID:['', [Validators.required]], 
      PROPERTYID:['', [Validators.required]], 
      USERID:['', [Validators.required]], 
      CLIENTID:['', [Validators.required]], 
      RENTALAGREEMENTID:['', [Validators.required]], 
      RENTALAPPLICATIONSTATUSID:['', [Validators.required]], 
      APPLICATIONDATE:['', [Validators.required]], 
      PREFERREDSTARTDATE:['', [Validators.required]], 
      NAME:['', [Validators.required]], 
      SURNAME:['', [Validators.required]], 
      EMAIL:['', [Validators.required]], 
      ADDRESS:['', [Validators.required]], 
      USERNAME:['', [Validators.required]], 
      IDENTITYDOCUMENT:['', [Validators.required]], 
  
   
    })  
    this.loadapps();  
    this.rejForm = this.formbulider.group({  
      DOCUMENTID:['', [Validators.required]], 
      RENTALAPPLICATIONID:['', [Validators.required]], 

  

        }) 
        this.loadapps();  
    this.appsForm = this.formbulider.group({  
      DOCUMENTID:['', [Validators.required]], 
      RENTALAPPLICATIONID:['', [Validators.required]], 

 

        }) 
        this.loadapps();  
        

  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
 downloadIDENTITYDOCUMENT(data) { debugger;
  const IDENTITYDOCUMENTName = data.IDENTITYDOCUMENT;
  var IDENTITYDOCUMENT = IDENTITYDOCUMENTName;
  this.adminService.downloadFile(IDENTITYDOCUMENT).subscribe((
    data) => { debugger;
    importedSaveAs(data, IDENTITYDOCUMENT)
  });
}

onSelectFile(file: FileList) {
  this.fileToUpload = file.item(0);
  var reader = new FileReader();
  reader.onload = (event: any) => {
  this.imageUrl = event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload);
}
onExpSubmit() {

  debugger;
  if (this.saveFileForm.invalid) {
    return;
  }


  let formData = new FormData();
 
  formData.append('FileUpload', this.resumeInput.nativeElement.files[0]);
  
  


  this.adminService.AddFileDetails(formData).subscribe(result => {
  });
}


  loadapps() {  
    this.allapps = this.adminService.GetApplications();  
  }  

  onFormRejSubmit() {  
    this.dataSaved = false;  
    const Application = this.appsForm.value;  
    this.UpdateAppRej(Application);  
    this.appsForm.reset();  
  }  
  
   onFormSubmit() {  
     this.dataSaved = false;  
     const apps = this.appForm.value;  
  
     this.appForm.reset();  
   }  
   onFormSubmitSelect() {  
    this.dataSaved = false;  
    const Application = this.appsForm.value;  
    this.UpdateApplication(Application);  
    this.appsForm.reset();  
    
  }  

  

      

  loadapplicationToEdit(DocumentID: string) {          debugger;
    this.adminService.getapplicationtById(DocumentID).subscribe(apps=> {  
      this.massage = null;  
      this.dataSaved = false;  
     
      this.appsIdUpdate = apps.DOCUMENTID;  
      this.appsForm.controls['DOCUMENTID'].setValue(apps.DOCUMENTID); 
      this.appsForm.controls['RENTALAPPLICATIONID'].setValue(apps.RENTALAPPLICATIONID); 
      // this.appsForm.controls['PROPERTYID'].setValue(apps.PROPERTYID);  
      // this.appsForm.controls['USERID'].setValue(apps.USERID); 
      // this.appsForm.controls['CLIENTID'].setValue(apps.CLIENTID); 
      // this.appsForm.controls['RENTALAGREEMENTID'].setValue(apps.RENTALAGREEMENTID); 
      // this.appsForm.controls['RENTALAPPLICATIONSTATUSID'].setValue(apps.RENTALAPPLICATIONSTATUSID); 
      // this.appsForm.controls['APPLICATIONDATE'].setValue(apps.APPLICATIONDATE);  
      // this.appsForm.controls['PREFERREDSTARTDATE'].setValue(apps.PREFERREDSTARTDATE);  
      // this.appsForm.controls['NAME'].setValue(apps.NAME); 
      // this.appsForm.controls['SURNAME'].setValue(apps.SURNAME);  
      // this.appsForm.controls['EMAIL'].setValue(apps.EMAIL);  
      // this.appsForm.controls['ADDRESS'].setValue(apps.ADDRESS);  
      // this.appsForm.controls['USERNAME'].setValue(apps.USERNAME);     
      // this.appsForm.controls['IDENTITYDOCUMENT'].setValue(apps.IDENTITYDOCUMENT);     
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
  UpdateApplication(apps: Application){
    debugger;
        this.adminService.updateAppAccepted(apps).subscribe(() => {  
          this.closebutton.nativeElement.click();   
          this.dataSaved = true;  
          this.massage = 'Record Updated Successfully';  
          this.loadapps();  
          this.appsIdUpdate = null;  
          this.appsForm.reset(); }
        );
    
      }
UpdateAppRej(apps: Application){
        debugger;
            this.adminService.updateAppRej(apps).subscribe(() => {  
              this.closebutton.nativeElement.click();   
              this.dataSaved = true;  
              this.massage = 'Record Updated Successfully';  
              this.loadapps();  
              this.appsIdUpdate = null;  
              this.appsForm.reset(); }
            );
        
          }

  resetForm() {  
     this.appForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
