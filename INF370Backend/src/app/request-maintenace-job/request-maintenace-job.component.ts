import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-maintenace-job',
  templateUrl: './request-maintenace-job.component.html',
  styleUrls: ['./request-maintenace-job.component.css']
})
export class RequestMaintenaceJobComponent implements OnInit {
  url="http://formspree.io/Mamphakee@gmail.com";
  
  constructor() { }

  ngOnInit(): void {
  }

}
