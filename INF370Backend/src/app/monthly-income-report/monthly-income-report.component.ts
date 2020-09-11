import { Component, OnInit } from '@angular/core';
import { Reporting } from '../reporting';
import { FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';
import Chart from 'chart.js';
@Component({
  selector: 'app-monthly-income-report',
  templateUrl: './monthly-income-report.component.html',
  styleUrls: ['./monthly-income-report.component.css']
})
export class MonthlyIncomeReportComponent implements OnInit {
  dateForm: any;  
  reportingClass:Reporting;
  constructor(private formbuilder: FormBuilder,private report:BookingService) { }

  ngOnInit(): void {
    this.dateForm = this.formbuilder.group({ 
      startDate: ['', [Validators.required]],  
      endDate: ['', [Validators.required]], 
    }); 
  }
  PAYMENTs: Object=null ;
  chart=[];
  title = 'angularReport';

  minDate: Date = new Date (1996, 7, 1);
maxDate: Date = new Date (1998, 5, 7);
//Error Display
error:any={isError:false,errorMessage:''};
isValidDate:any;

  model : any={};    
  emp:any;  

onSubmit(){
// if(this.chart) this.chart.destroy();
debugger;
 this.chart=[];
  const date = this.dateForm.value;

  // this.get(date); 

  this.report.getDateData(date).subscribe((res: any) => {  
    
    console.log(res); 
    
    let keys=res["PAYMENTs"].map(d=>d.PAYMENT_REFERENCE_NO);
    let values=res["PAYMENTs"].map(d=>d.Total);
  
    // this.emp=res; 
    this.PAYMENTs=res["PAYMENTs"] ; 
   
    debugger;
    this.chart=new Chart('canvas'), {  
      type: 'bar',  
      data: {  
        labels: keys,  
        datasets: [  
          {  
            data:values,  
            borderColor: '#3cb371',  
            backgroundColor: "#0000FF",  
          }  
        ]  
      },  
      options: {  
        title: {
          display: true,
          text: 'Total Income'
      },
        legend: {  
          display: false  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true,
            ticks: {
              beginAtZero: true,
              // max:70000
            }  
          }],  
        }  
      }  
    }; 


      
 
} )

}


}
