import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Job} from 'src/classes/Jobs';
import { MaintenanceService } from 'src/app/maintenance.service';

@Component({
  selector: 'app-viewrepairrequestjobs',
  templateUrl: './viewrepairrequestjobs.component.html',
  styleUrls: ['./viewrepairrequestjobs.component.css']
})
export class ViewrepairrequestjobsComponent implements OnInit {
  dataSaved = false;  
  jobForm: any;
  jobfeedbackForm: any; 
  alljobs: Observable<Job[]>;  
  loadfiltedjobs: Observable<Job[]>;  
  jobsIdUpdate = null;  
  massage = null;  
 
 

 
  constructor(private formbulider: FormBuilder,private manService:MaintenanceService) { }  
  ngOnInit(): void {  
    this.jobForm = this.formbulider.group({ 
      
      RENTALAGREEMENTID:['', [Validators.required]], 
      JOBTYPEID:['', [Validators.required]],  
      EMPLOYEEID:['', [Validators.required]],  
      JOBSTATUSID: ['', [Validators.required]],  
      ADDRESS:['', [Validators.required]],  
      DATEREQUESTED:['', [Validators.required]],  
      DESCRIPTION:['', [Validators.required]],  
      USERNAME:['',[Validators.required]],
      JOBSTATUS:['', [Validators.required]], 
  
   
    })  
    this.loadAlljobs();  
    this.jobfeedbackForm = this.formbulider.group({  
    
      RENTALAGREEMENTID:['', [Validators.required]], 
      JOBTYPEID:['', [Validators.required]],  
      EMPLOYEEID:['', [Validators.required]],  
      JOBSTATUSID: ['', [Validators.required]],  
      ADDRESS:['', [Validators.required]],  
      DATEREQUESTED:['', [Validators.required]],  
      DESCRIPTION:['', [Validators.required]], 
      DATECOMPLETED:['', [Validators.required]], 
      JOBSTATUS:['', [Validators.required]], 
        }) 

  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadAlljobs() {  
    this.alljobs = this.manService.GetAssignedJobs();  
  }  

    
  
   onFormSubmit() {  
     this.dataSaved = false;  
     const jobs = this.jobForm.value;  
     this.Createjob(jobs);  
     this.jobForm.reset();  
   }  
   onFormSubmitUpdateJob() {  
    this.dataSaved = false;  
    const Job = this.jobfeedbackForm.value;  
    this.UpdateJob(Job);  
    this.jobfeedbackForm.reset();  
    
  }  

  

      
  loadjobToEdit(jobID: string) {  
    this.manService.getJobById(jobID).subscribe(jobs=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.jobsIdUpdate = null;  
      this.jobsIdUpdate = jobs.JOBID;  
      this.jobfeedbackForm.controls['RENTALAGREEMENTID'].setValue(jobs.RENTALAGREEMENTID); 
      this.jobfeedbackForm.controls['JOBTYPEID'].setValue(jobs.JOBTYPEID); 
      this.jobfeedbackForm.controls['EMPLOYEEID'].setValue(jobs.EMPLOYEEID); 
      this.jobfeedbackForm.controls['JOBSTATUSID'].setValue(jobs.JOBSTATUSID); 
      this.jobfeedbackForm.controls['ADDRESS'].setValue(jobs.ADDRESS); 
      this.jobfeedbackForm.controls['DATEREQUESTED'].setValue(jobs.DATEREQUESTED);  
      this.jobfeedbackForm.controls['DESCRIPTION'].setValue(jobs.DESCRIPTION);  
      this.jobfeedbackForm.controls['DATECOMPLETED'].setValue(jobs.DATECOMPLETED);  
          
    }); 
  }
     
UpdateJob(jobs: Job){
      debugger;
          this.manService.updateJob(jobs).subscribe(() => {  
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.loadAlljobs();  
            this.jobsIdUpdate = null;  
            this.jobfeedbackForm.reset(); }
          );
      
        }
  
  
  
   Createjob(jobs: Job) {  
     if (this.jobsIdUpdate == null) {  debugger;
       this.manService.createJob(jobs).subscribe(  
         () => {  
           this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
           this.loadAlljobs();  
           this.jobsIdUpdate = null;  
           this.jobForm.reset();  
         }  
       );  
     } 
  }   
  
  deletejob(jobId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.manService.deleteJobById(jobId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAlljobs();  
      this.jobsIdUpdate = null;  
      this.jobForm.reset();  
  
    });  
  }  
  }  
  resetForm() {  
     this.jobForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
