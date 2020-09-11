import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import{EmployeeService} from '../employees.service';
import { Employee } from 'src/classes/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'employee',
  templateUrl: 'employee.component.html',
  styleUrls: ['employee.component.sass']
  ,providers:[EmployeeService]
})

export class EmployeeComponent implements OnInit {  
  dataSaved = false;  
  employeeForm: any;  
  allemployees: Observable<Employee[]>;  
  employeeIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  updateEmployeeForm: any; 
  updateEmployee:any;
  product:Employee[];
  searchedKeyword: string;
  
  
  
  constructor(private router: Router,private formbulider: FormBuilder,private employeeService:EmployeeService) { }  
  ngOnInit(): void {  
    if (sessionStorage.getItem('EmployeeID') == null) {
      this.router.navigate(['']);
    }

    this.updateEmployeeForm = this.formbulider.group({  
      EMPLOYEEID:['', [Validators.required]], 
      USERID:['', [Validators.required]],  
      NAME:['', [Validators.required]],  
      SURNAME: ['', [Validators.required]],  
      EMPLOYEENATIONALID:['', [Validators.required]],  
      DATEEMPLOYED:['', [Validators.required]],  
      DATEOFBIRTH:['', [Validators.required]],  
      EMPLOYEEPASSPORTNO:['', [Validators.required]],  
      EMPLOYEETYPEID:['', [Validators.required]],  
    })  
    this.employeeForm = this.formbulider.group({  
      USERID:['', [Validators.required]],  
      NAME:['', [Validators.required]],  
      SURNAME: ['', [Validators.required]],  
      EMPLOYEENATIONALID:['', [Validators.required]],  
      DATEEMPLOYED:['', [Validators.required]],  
      DATEOFBIRTH:['', [Validators.required]],  
      EMPLOYEEPASSPORTNO:['', [Validators.required]],  
      EMPLOYEETYPEID:['', [Validators.required]],
        }) 
    this.loadAllemployees();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadAllemployees() {  
    this.allemployees = this.employeeService.getAllEmployee();  
  }  

    
  
   onFormSubmit() {  
     this.dataSaved = false;  
     const employees = this.employeeForm.value;  
     this.Createemployee(employees);  
     this.employeeForm.reset();  
   }  
   onFormSubmitUpdateEmployee() {  
        this.dataSaved = false;  
        const Employee = this.updateEmployeeForm.value;  
        this.UpdateEmployee(Employee);  
        this.updateEmployeeForm.reset();  
        
      }  
  

      
  loademployeeToEdit(employeeId: string) {  
    this.employeeService.getEmployeeById(employeeId).subscribe(employees=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.employeeIdUpdate = employees.EMPLOYEEID;  
      this.updateEmployeeForm.controls['EMPLOYEEID'].setValue(employees.EMPLOYEEID); 
      this.updateEmployeeForm.controls['USERID'].setValue(employees.USERID); 
      this.updateEmployeeForm.controls['EMPLOYEETYPEID'].setValue(employees.EMPLOYEETYPEID); 
      this.updateEmployeeForm.controls['EMPLOYEENATIONALID'].setValue(employees.EMPLOYEENATIONALID); 
      this.updateEmployeeForm.controls['EMPLOYEEPASSPORTNO'].setValue(employees.EMPLOYEEPASSPORTNO); 
      this.updateEmployeeForm.controls['DATEEMPLOYED'].setValue(employees.DATEEMPLOYED); 
      this.updateEmployeeForm.controls['NAME'].setValue(employees.NAME);  
      this.updateEmployeeForm.controls['SURNAME'].setValue(employees.SURNAME);  
      this.updateEmployeeForm.controls['DATEOFBIRTH'].setValue(employees.DATEOFBIRTH);  
          
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
UpdateEmployee(employees: Employee){
      debugger;
          this.employeeService.updateEmployee(employees).subscribe(() => {  
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.loadAllemployees();  
            this.employeeIdUpdate = null;  
            this.updateEmployeeForm.reset(); }
          );
      
        }
  
  
  
   Createemployee(employees: Employee) {  
     if (this.employeeIdUpdate == null) {  debugger;
       this.employeeService.createEmployee(employees).subscribe(  
         () => {  
           this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
           this.loadAllemployees();  
           this.employeeIdUpdate = null;  
           this.employeeForm.reset();  
         }  
       );  
     } 
  }   
  
  deleteemployee(employeeId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllemployees();  
      this.employeeIdUpdate = null;  
      this.employeeForm.reset();  
  
    });  
  }  
  }  
  resetForm() {  
     this.employeeForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
