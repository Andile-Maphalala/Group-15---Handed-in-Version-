import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Slot} from 'src/classes/Slot';
import {Date} from 'src/classes/Date';
import {DateTimeSlot} from 'src/classes/DateTime';
import { MaintenanceService } from 'src/app/maintenance.service';

@Component({
  selector: 'app-setupviewingschedule',
  templateUrl: './setupviewingschedule.component.html',
  styleUrls: ['./setupviewingschedule.component.css']
})
export class SetupviewingscheduleComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
    @ViewChild('addAreaclosebutton') addTypeclosebutton;
    dataSaved = false;  
    dateForm: any;  
    dateslotsForm: any; 
    slotsForm: any; 
    alldates: Observable<Date[]>;  
    alldatetimeslots: Observable<DateTimeSlot[]>;  
    allslots: Observable<Slot[]>; 
    
    dateIdUpdate = null;  
    sloteIdUpdate = null; 
    dateslotsIdUpdate = null;
   
    massage = null;  
    showModalBox: boolean = false;
    AddshowModalBox: boolean = false;
  
   
  
    
    
    
    constructor(private formbulider: FormBuilder,private manService:MaintenanceService) { }  
    ngOnInit(): void {  
      this.dateForm = this.formbulider.group({  
    
        DATEDESCRIPTION:['', [Validators.required]],  
       
      })  
      this.loadAlldates();  

      this.slotsForm = this.formbulider.group({  
     
        SLOTDESCRIPTION:['', [Validators.required]],  
        SLOTEND:['', [Validators.required]],  
          
          }) 
      this.loadAllslots(); 

      this.dateslotsForm = this.formbulider.group({  

        DATEID:['', [Validators.required]], 
        SLOTID:['', [Validators.required]], 
          }) 
      this.loaddatetimeslot();  
  
    
    }  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
   
   }
   loadAlldates() {  
      this.alldates = this.manService.getAllDates();  
  }  
  loadAllslots() {  
      this.allslots = this.manService.getAllSlots();  
  }  
  loaddatetimeslot() {  
      this.alldatetimeslots = this.manService.getAllDateSlots();  
  }  
 
      
    
     onDateFormSubmit() {  
       this.dataSaved = false;  
       const dates = this.dateForm.value;  
       this.Createdates(dates);  
       this.dateForm.reset();  
     }  
     onSlotFormSubmit() {  
      this.dataSaved = false;  
      const slot = this.slotsForm.value;  
      this.Createslots(slot);  
      this.slotsForm.reset();  
    }  
    onDateTimeFormSubmit() {  
      this.dataSaved = false;  
      const dateslots = this.dateslotsForm.value;  
      this.CreateDateTimeSlot(dateslots);  
      this.dateslotsForm.reset();  
    }  
    
     
    
  
        
    loadslotToEdit(slotId: string) {  
      this.manService.getSlotById(slotId).subscribe(slots => {  
        this.massage = null;  
        this.dataSaved = false;  
        this.sloteIdUpdate = slots;
        this.dateslotsForm.controls['SLOTID'].setValue(slots.SLOTID); 
        
            
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
  // UpdateEmployee(employees: Employee){
  //       debugger;
  //           this.manService.updateEmployee(employees).subscribe(() => {  
  //             this.dataSaved = true;  
  //             this.massage = 'Record Updated Successfully';  
  //             this.loadAllemployees();  
  //             this.employeeIdUpdate = null;  
  //             this.updateEmployeeForm.reset(); }
  //           );
        
  //         }
    
    
    
  Createdates(dates: Date) {  
       if (this.dateIdUpdate == null) {  
         this.manService.CreateDates(dates).subscribe(  
           () => {  
             this.dataSaved = true;  
             this.closebutton.nativeElement.click(); 
            this.massage = 'Record saved Successfully';  
             this.loadAlldates();  
             this.dateIdUpdate = null;  
             this.dateForm.reset();  
           }  
         );  
       } 
    }   
    Createslots(slots: Slot) { 
      if (this.sloteIdUpdate == null) {   
        this.manService.CreateSlots(slots).subscribe(  
          () => {  
 
            this.dataSaved = true;  
            this.closebutton.nativeElement.click(); 
           this.massage = 'Record saved Successfully';  
            this.loadAllslots();  
            this.sloteIdUpdate = null;  
            this.slotsForm.reset();  
          }  
        );  
      } 
   }   
   CreateDateTimeSlot(datetimeslots: DateTimeSlot) {  
    if (this.dateslotsIdUpdate == null) {  
      this.manService.CreateDateTimeSlots(datetimeslots).subscribe(  
        () => {  
        
          this.dataSaved = true;  
          this.closebutton.nativeElement.click(); 
         this.massage = 'Record saved Successfully';  
          this.loaddatetimeslot();  
          this.dateslotsIdUpdate = null;  
          this.dateslotsForm.reset();  
        }  
      );  
    } 
  }   
  

  
    
    // deleteemployee(employeeId: string) {  
    //   if (confirm("Are you sure you want to delete this ?")) {   
    //   this.manService.deleteEmployeeById(employeeId).subscribe(() => {  
    //     this.dataSaved = true;  
    //     this.massage = 'Record Deleted Succefully';  
    //     this.loadAllemployees();  
    //     this.employeeIdUpdate = null;  
    //     this.employeeForm.reset();  
    
    //   });  
   // }  
   // }  
    // resetForm() {  
    //    this.employeeForm.reset();  
    //    this.massage = null;  
    //    this.dataSaved = false;  
    //    }  
       
  }
  